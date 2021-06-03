<?php
use Acme\Shop\Models\Product;
use Acme\Shop\Models\Category;
use Acme\Shop\Models\Tag;
use Cms\Models\ThemeData;
use RainLab\Pages\Classes\Menu as PagesMenu;
use Cms\Classes\Theme;
use Acme\Settings\Models\Slider;

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
  Route::get('/categories', function () {
    return Category::orderBy('sort_order', 'asc')->where('is_show', 1)->withCount('products')->get();
  });
  Route::get('/settings/{name}', function ($name) {
    return ThemeData::select('data')->where('theme', $name)->first();
  });
  Route::get('/tags', function () {
    return Tag::select('title', 'slug')->orderBy('sort_order', 'asc')->limit(14)->get();
  });
  Route::get('/navbar', function () {
    $theme = Theme::getActiveTheme();
    $menu = PagesMenu::loadCached($theme, 'main');
    return $menu->items;
  });
  Route::get('/category/{slug}', function ($slug) {
    return Category::where('slug', $slug)->with(['products'])->first();
  });
  Route::get('/product/{id}', function ($id) {
    return Product::with(['categories', 'gallery', 'tags'])->where('id', $id)->first();
  });
  Route::get('/slider', function () {
    return Slider::orderBy('sort_order', 'asc')->get();
  });
  Route::post('/send-message', 'Acme\Shop\Classes\OrderController@send');
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
