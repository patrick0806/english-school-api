import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { SchoolMemberContract } from '@shared/entities';
import { PdfService } from '@shared/providers';
import { IContractTemplate } from '@shared/providers/pdf/interfaces/contractTemplate.interface';
import { SchoolMemberRepository } from '@shared/repositories';
import { SchoolMemberContracRepository } from '@shared/repositories/schoolMemberContract.repository';

import { CreateContractRequestDTO } from './dtos/request.dto';

@Injectable()
export class CreateContractService {
  constructor(
    private repository: SchoolMemberContracRepository,
    private schoolMemberRepository: SchoolMemberRepository,
    private pdfService: PdfService,
    private i18n: I18nService,
  ) {}

  async execute(contractData: CreateContractRequestDTO): Promise<any> {
    const alreadyExists = await this.repository.findBySchoolMemberIdAndCourse(
      contractData.schoolMember.id,
      contractData.course.id,
    );

    if (alreadyExists) {
      throw new ConflictException({
        error: this.i18n.translate('exceptions.error.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
        message: this.i18n.translate('exceptions.message.CONFLICT_ENTITY', {
          lang: I18nContext.current().lang,
        }),
      });
    }
    const savedContract = await this.repository.save(
      plainToClass(SchoolMemberContract, contractData),
    );

    const student = await this.schoolMemberRepository.findById(
      contractData.schoolMember.id,
    );
    const pdfData: IContractTemplate = {
      student: {
        name: student.name,
        email: student.email,
        address: {
          street: student.address.street,
          neighborhood: student.address.neighborhood,
          city: student.address.city,
          state: student.address.state,
        },
        documentType: student.documentType,
        documentValue: student.documentValue,
        nationality: 'to future',
        isBrazilian: student.isBrazilian,
      },
      contract: {
        amountOfClasses: savedContract.amountClassesWeekly,
        amountOfMounths: savedContract.numberOfMonths,
        amountValue: savedContract.monthlyValue,
        courseLanguage: savedContract.course.name, //TODO - Change if we have problems
        mouthValueText: this.numberToWords(savedContract.monthlyValue),
        currentDate: new Date().toLocaleDateString('pt-BR'),
      },
    };
    //return this.pdfService.generateContractPdf(pdfData);
    return pdfData;
  }

  private numberToWords(n: number): string {
    if (n < 0 || n > 999) {
      throw new Error('Número fora do intervalo permitido (0-999)');
    }

    const unidades: string[] = [
      'zero',
      'um',
      'dois',
      'três',
      'quatro',
      'cinco',
      'seis',
      'sete',
      'oito',
      'nove',
    ];
    const dezenas: string[] = [
      'dez',
      'onze',
      'doze',
      'treze',
      'quatorze',
      'quinze',
      'dezesseis',
      'dezessete',
      'dezoito',
      'dezenove',
    ];
    const dezenasMaiores: string[] = [
      'vinte',
      'trinta',
      'quarenta',
      'cinquenta',
      'sessenta',
      'setenta',
      'oitenta',
      'noventa',
    ];

    const centenas: string[] = [
      'cem',
      'cento e',
      'duzentos e',
      'trezentos e',
      'quatrocentos e',
      'quinhentos e',
      'seiscentos e',
      'setecentos e',
      'oitocentos e',
      'novecentos e',
    ];

    if (n < 10) {
      return unidades[n];
    } else if (n < 20) {
      return dezenas[n - 10];
    } else if (n < 100) {
      const d = Math.floor(n / 10);
      const u = n % 10;
      if (u === 0) {
        return dezenasMaiores[d - 2];
      } else {
        return `${dezenasMaiores[d - 2]} e ${unidades[u]}`;
      }
    } else {
      const c = Math.floor(n / 100);
      const rest = n % 100;
      if (rest === 0) {
        return c === 1 ? 'cem' : centenas[c];
      } else {
        return `${centenas[c]} ${this.numberToWords(rest)}`;
      }
    }
  }
}
