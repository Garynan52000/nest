import { Entity, PrimaryGeneratedColumn, Column, Repository, EntityRepository } from "typeorm";

@Entity()
export class AuthorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name?: string;

}

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {
    
}
