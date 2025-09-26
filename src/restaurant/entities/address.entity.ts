import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IAddress } from '../value-objects/address.value-object';
import RestaurantEntity from './restaurant.entity';

@Entity('addresses')
class AddressEntity implements IAddress {
  @PrimaryGeneratedColumn()
  id: number | undefined;

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
  aptUnit: string | undefined;

  @OneToOne(() => RestaurantEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant!: RestaurantEntity;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt!: Date;
}

export default AddressEntity;
