<?php
use Acme\Shop\Models\Product;
use Acme\Shop\Models\Category;

Route::prefix('/api')->group(function () {
  Route::get('/new-products', function () {
    $new_products = Product::select('id','title','image','price','sale_price','is_new','is_hit','code')->with(['categories'])->orderBy('sort_order', 'asc')->where('is_active', 1)->where('is_new', 1)->limit(8)->get();
    return $new_products;
  });
  Route::get('/popular-products', function () {
    $hit_products = Product::select('id','title','image','price','sale_price','is_new','is_hit','code')->with(['categories'])->orderBy('sort_order', 'asc')->where('is_active', 1)->where('is_hit', 1)->limit(8)->get();
    return $hit_products;
  });
  Route::get('/products/{ids}', function ($ids) {
    return Product::select('id','title','image','price','sale_price')->whereIn('id', explode(',', $ids))->get();
  });
  Route::post('/add-order', 'Acme\Shop\Classes\OrderController@add');
  // Route::get('/post/{name}', 'Acme\Setting\Classes\Posts@getPost');
  // Route::get('/gallery/{slug}', 'Acme\Setting\Classes\Galleries@getGallery');
  // Route::get('/services', function () {
  //   $services = Service::with(['file'])->orderBy('sort_order', 'asc')->get();
  //   return $services;
  // });
  // Route::get('/contacts', function () {
  //   $contacts = Contact::with(['town'])->get();
  //   return $contacts;
  // });
  // Route::get('/contacts/{id}', function ($id) {
  //   return Contact::whereHas('town', function ($query) use ($id) {
  //     return $query->where('id', '=', $id);
  //   })->with(['town'])->first();
  // });
  // Route::post('/send-message', 'Acme\Setting\Classes\MessageController@send');
  // Route::get('/testimonials', function () {
  //   $testimonials = Testimonial::with(['avatar'])->orderBy('sort_order', 'asc')->where('status', 1)->get();
  //   return $testimonials;
  // });
  // Route::post('/add-testimonial', 'Acme\Setting\Classes\TestimonialController@send');
  // Route::get('/faq', function () {
  //   return Faq::orderBy('sort_order', 'asc')->get();
  // });
});
