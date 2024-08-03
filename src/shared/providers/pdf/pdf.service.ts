import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import PDFDocument from 'pdfkit';

import { IContractTemplate } from './interfaces/contractTemplate.interface';
import path from 'path';

@Injectable()
export class PdfService {
  constructor() {}

  async generateContractPdf({
    student,
    contract,
  }: IContractTemplate): Promise<Buffer> {
    const doc = new PDFDocument();

    doc.image(path.join(__dirname, 'templates', 'logo_text.png'), {
      fit: [250, 150],
      align: 'center',
      valign: 'center',
    });
    doc.fontSize(24).text('CONTRATO PARA ENSINO DE LÍNGUA ESTRANGEIRA', {
      align: 'center',
      underline: true,
    });
    doc.fontSize(14);
    doc.text(`Aluno: ${student.name}, ${student.nationality}`, {
      align: 'justify',
    });
    doc.text(
      `Documento: ${student.documentType} Nº. ${student.documentValue}`,
      { align: 'justify' },
    );
    doc.text(
      `Endereço: ${student.address.street}, ${student.address.neighborhood}, ${student.address.city}/${student.address.state}`,
      { align: 'justify' },
    );
    doc.text(`Email: ${student.email}`, { align: 'justify' });
    doc.text(
      `Escola: B-Fluent Idioma CNPJ 43.845.409/0001-11, com sede na Rua Padre Gatone, Edificio Arnoldo B. Scheffer # 20, sala #15, Centro 1, CEP 88350-350, Brusque SC.`,
    );

    doc.addPage();
    doc.fontSize(16);
    doc.text(
      `Cláusula 1: O contrato tem como objetivo garantir que sejam ministradas aulas de ensino da língua ${contract.courseLanguage} para o aluno acima identificado.`,
    );
    doc.text(
      `Cláusula 2: O aluno terá direito a ${contract.amountOfClasses} aulas por semana, com uma carga horária diária de 50 minutos por aula, totalizando 100 minutos (1:60 horas semanais). O curso terá a duração de doze (12) meses, podendo variar a conclusão conforme a disponibilidade do aluno.`,
    );
    doc.text(
      `Cláusula 3: A escola se compromete a realizar as aulas sempre com a presença de um professor e nunca com vídeos ou gravações.`,
    );
    doc.text(
      `Cláusula 4: O aluno se compromete a participar do curso durante um período mínimo de um ano (${contract.amountOfMounths} meses) de aulas presenciais, sempre com acompanhamento do professor.`,
    );
    doc.text(
      `Cláusula 5: O aluno se compromete a pagar um valor mensal de ${contract.mouthValueText} (${contract.amountValue}), referente à mensalidade.`,
    );
    doc.text(
      `Cláusula 6: O valor pago pelo aluno, referente às mensalidades, deve ser efetuado até o dia dez de cada mês. Para esse pagamento, o aluno pode escolher as modalidades de pagamento em dinheiro, pix, transferência bancária ou cartão de débito/crédito.`,
    );
    doc.text(
      `Cláusula 7: Se o aluno sabe que não vai conseguir efetuar o pagamento até a data do dia dez, o aluno deve informar a escola com até dois dias de antecedência. Caso seja respeitado esse período de antecedência, a escola se compromete a mudar a data do pagamento da mensalidade para o dia quinze sem cobrar juros ou multa sobre o valor em questão. Se o aluno não pagar a mensalidade dentro das datas limites, a escola se reserva o direito de cobrar juros/multa de 2% ao dia e no máximo de 10% ao mês sobre o valor da mensalidade.`,
    );
    doc.text(
      `Cláusula 8: O aluno pode mudar ou cancelar no máximo de duas aulas por mês, desde que avise o professor com antecedência de pelo menos um dia. Caso o aluno considere cancelar mais de duas aulas por mês, será cobrado um valor adicional de R$ 15,00 por cada aula com data ou horários alterados.`,
    );
    doc.text(
      `Cláusula 9: A escola se compromete a entregar um certificado validado e assinado pelo professor e responsável pela escola em questão ao final do período acordado na Cláusula 2.`,
    );
    doc.text(
      `Cláusula 10: A escola se compromete a não cobrar multa de cancelamento se este for feito no final de cada livro, no período que representa seis meses. Caso o cancelamento seja solicitado pelo aluno em qualquer período diferente ao explicado acima, o aluno terá que pagar uma multa de quebra de contrato de 20% do valor que ainda falta pagar de mensalidades até o final do curso.`,
    );

    doc.fontSize(12);
    doc.text(
      `Declaro que reconheço a validade das Cláusulas acima descritas e reconheço meu compromisso para com a escola em questão.\n\nAluno(a):________________________________________\n${contract.currentDate}`,
      { align: 'justify' },
    );
    doc.end();
    const tempFilePath = `./${new Date().toISOString()}-temp.pdf`;
    doc.pipe(fs.createWriteStream(tempFilePath));
    await new Promise((resolve, reject) => {
      doc.on('finish', resolve);
      doc.on('error', reject);
    });
    const file = fs.readFileSync(tempFilePath);
    fs.unlinkSync(tempFilePath);
    return file;
  }
}
