import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProduct1610242616559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar(200)",
            isNullable: false,
          },
          {
            name: "type",
            type: "varchar(100)",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar(400)",
          },
          {
            name: "filename",
            type: "text",
          },
          {
            name: "height",
            type: "real",
            isNullable: false,
          },
          {
            name: "width",
            type: "real",
            isNullable: false,
          },
          {
            name: "rating",
            type: "integer",
          },
          {
            name: "price",
            type: "double precision",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
