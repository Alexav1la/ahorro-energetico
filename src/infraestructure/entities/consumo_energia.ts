import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { apartament } from "./apartament";


@Entity ("consumo_energia")
export class ConsumoEnergia {

    @PrimaryGeneratedColumn()
    id_consumo!: number;

    @Column ({type: "int"})
    apartament_id!: number;

    @Column ({type: "decimal", precision: 10, scale: 2})
    consumo_kwh!: number;

    @Column ({type: "decimal", precision: 10, scale: 2})
    cost!: number;

    @Column ({type: "timestamp"})
    fecha_lectura!: Date;

    @Column ({type: "varchar", length: 10})
    mes_facturacion!: string;

    @Column ({type: "decimal", precision: 10, scale: 2})
    lectura_medidor!: number;

    @Column ({type: "text", nullable: true})
    notas!: string;

    @CreateDateColumn({type: "timestamp"})
    create_at!: Date;

 }