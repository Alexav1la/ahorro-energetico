import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { ConsumoEnergia } from "./consumo_energia";

@Entity("apartament")
export class apartament {
    @PrimaryGeneratedColumn()
    id_apartament!: number;

    @Column({ type: "varchar", length: 50, unique:true })
    apartament_number!: string;

    @Column({ type: "varchar", length: 50 })
    torre!: string;

    @Column({ type: "int" })
    piso!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    area_m2!: number;

    @Column({ type: "int" })
    user_id!: number;

    @Column({ type: "varchar", length: 50, default: "active" })
    status!: string;

    @CreateDateColumn({ type: "timestamp" })
    create_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    update_at!: Date;

}