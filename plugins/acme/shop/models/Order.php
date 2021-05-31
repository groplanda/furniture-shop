<?php namespace Acme\Shop\Models;

use Model;

/**
 * Model
 */
class Order extends Model
{
    use \October\Rain\Database\Traits\Validation;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_shop_orders';

    /**
     * @var array Validation rules
     */
    public $rules = [
      'name' => 'required'
    ];

    protected $jsonable = ['products'];
}
