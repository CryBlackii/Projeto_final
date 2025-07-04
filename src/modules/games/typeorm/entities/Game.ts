import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import Developer from "../../../developer/typeorm/entities/Developer";

@Entity('games')
export default class Game {
  @PrimaryGeneratedColumn() // ID numérico auto-incrementado
  id: number;

  @Column()
  nome: string;
  
  @Column()
  genero: string;
  
  @Column({ type: 'date' })
  data_lancamento: Date;
  
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;
  
  @Column('text')
  descricao: string;
  
  @ManyToOne(() => Developer, developer => developer.games)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}