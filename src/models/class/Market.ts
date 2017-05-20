import 'rxjs/add/operator/map';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Market {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
