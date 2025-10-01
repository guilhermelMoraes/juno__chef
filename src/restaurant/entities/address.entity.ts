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
  readonly id: number | undefined;

  @Column()
  readonly number!: number;

  @Column({
    type: 'varchar',
    length: 11,
  })
  readonly postalCode!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  readonly street!: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  readonly aptUnit: string | undefined;

  @OneToOne(() => RestaurantEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  restaurant!: RestaurantEntity;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
  })
  deletedAt!: Date;
}

export default AddressEntity;
