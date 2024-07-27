import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseSchema1721851481652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criando a tabela 'schools'
    await queryRunner.query(`
        CREATE TABLE "schools" (
          "id" SERIAL PRIMARY KEY,
          "name" VARCHAR(70) UNIQUE NOT NULL,
          "is_active" BOOLEAN DEFAULT TRUE NOT NULL,
          "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

    // Criando a tabela 'courses'
    await queryRunner.query(`
      CREATE TABLE "courses" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(30) NOT NULL,
        "description" VARCHAR(50),
        "school_id" INTEGER REFERENCES "schools"(id),
        "is_active" BOOLEAN DEFAULT TRUE NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando a tabela 'groups'
    await queryRunner.query(`
      CREATE TABLE "groups" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "course_id" INTEGER REFERENCES "courses"(id),
        "school_id" INTEGER REFERENCES "schools"(id),
        "is_active" BOOLEAN DEFAULT TRUE,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando a tabela 'school_members'
    await queryRunner.query(`
      CREATE TABLE "school_members" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(70) NOT NULL,
        "email" VARCHAR(50) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "phone_number" VARCHAR(20),
        "user_code" VARCHAR(20) UNIQUE NOT NULL,
        "is_active" BOOLEAN DEFAULT TRUE NOT NULL,
        "role" VARCHAR(20) NOT NULL,
        "school_id" INTEGER REFERENCES "schools"(id),
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando a tabela 'school_member_contracts'
    await queryRunner.query(`
      CREATE TABLE "school_member_contracts" (
        "id" SERIAL PRIMARY KEY,
        "monthly_value" INTEGER NOT NULL,
        "number_of_months" INTEGER,
        "start_date" DATE DEFAULT CURRENT_DATE,
        "status" VARCHAR(20) NOT NULL,
        "course_id" INTEGER REFERENCES "courses"(id),
        "school_member_id" INTEGER REFERENCES "school_members"(id),
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando a tabela de junção para 'courses' e 'school_members'
    await queryRunner.query(`
      CREATE TABLE "school_members_courses" (
        "school_members_id" INTEGER REFERENCES "school_members"(id),
        "course_id" INTEGER REFERENCES "courses"(id),
        PRIMARY KEY ("school_members_id", "course_id")
      );
    `);

    // Criando a tabela de junção para 'groups' e 'school_members'
    await queryRunner.query(`
      CREATE TABLE "school_members_groups" (
        "school_members_id" INTEGER REFERENCES "school_members"(id),
        "group_id" INTEGER REFERENCES "groups"(id),
        PRIMARY KEY ("school_members_id", "group_id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertendo a criação das tabelas
    await queryRunner.query(`
      DROP TABLE "school_members_groups";
    `);
    await queryRunner.query(`
      DROP TABLE "school_members_courses";
    `);
    await queryRunner.query(`
      DROP TABLE "school_member_contracts";
    `);
    await queryRunner.query(`
      DROP TABLE "school_members";
    `);
    await queryRunner.query(`
      DROP TABLE "groups";
    `);
    await queryRunner.query(`
      DROP TABLE "courses";
    `);
    await queryRunner.query(`
      DROP TABLE "schools";
    `);
  }
}
