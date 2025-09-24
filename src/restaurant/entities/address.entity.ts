import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from '../restaurant.model';
import RestaurantEntity from './restaurant.entity';

@Entity('addresses')
class AddressEntity implements Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  number!: number;

  @Column({
    type: 'varchar',
    length: 11,
  })
  postalCode!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  street!: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  aptUnit?: string;

  @OneToOne(() => RestaurantEntity, { cascade: true })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant!: RestaurantEntity;
}

export default AddressEntity;
