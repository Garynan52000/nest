import { Entity, PrimaryGeneratedColumn, Column  } from 'typeorm';
import { IsString, IsInt } from "class-validator";

@Entity()
export class CatEntity {

    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @Column()
    name: string;

    @IsInt()
    @Column()
    age: number;

    /**
     * 品种
     */
    @IsString()
    @Column()
    breed: string;
    
}