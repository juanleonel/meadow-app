suite('"About" Page Tests', function(){
  test('page should contain link to contact page', function(){
    const link = document.querySelector('a[href="/contact"]');
    assert(link, 'No se encontró el enlace a /contact');
  });
});