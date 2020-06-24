import { Entity, PrimaryGeneratedColumn, Column, EntityRepository, Repository } from "typeorm";

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
