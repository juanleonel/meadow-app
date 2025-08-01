const Post = require('../models/post.model');
const dummyPosts = Array.from({ length: 10 }, (_, i) => ({
  title: `Título de prueba ${i + 1}`,
  content: `Este es el contenido del post número ${i + 1}.`,
  author: `Autor${i + 1}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [`tag${i + 1}`, 'demo', 'test'],
  createdBy: `admin${i + 1}`,
  updatedBy: `admin${i + 1}`
}));

const seedPosts = async () => {
  try {
    await Post.deleteMany(); // Limpia la colección si quieres empezar desde cero
    await Post.insertMany(dummyPosts);
    console.log('Seeder ejecutado correctamente');
  } catch (error) {
    console.error('Error al ejecutar el seeder:', error);
  }
};

seedPosts();
