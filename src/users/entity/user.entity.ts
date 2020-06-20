import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id?: number;
    
    @Generated('uuid') 
    @Column()
    uuid?: string;

    @Column()
    username?: string;

    @Column()
    password?: string;
    
}