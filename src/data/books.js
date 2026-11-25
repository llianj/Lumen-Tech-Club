// status: 'concluido' | 'atual' | 'proximo'
// capa: coloque a imagem em public/capas/ e use o caminho abaixo (ex.: /capas/ciclo-1.jpg)
export const cycles = [
  { ciclo: 1, titulo: 'Entendendo Algoritmos', autor: 'Aditya Bhargava', status: 'concluido', cor: 'purple',
    capa: '/capas/ciclo-1.jpg',
    descricao: 'Uma introdução ilustrada e leve ao mundo dos algoritmos.' },
  { ciclo: 2, titulo: 'O andar do bêbado', autor: 'Leonard Mlodinow', status: 'atual', cor: 'green',
    capa: '/capas/ciclo-2.jpg',
    descricao: 'Como o acaso governa nossas vidas, e por que o enxergamos tão mal.' },
  { ciclo: 3, titulo: 'O programador pragmático', autor: 'Andrew Hunt e David Thomas', status: 'proximo', cor: 'pink',
    capa: '/capas/ciclo-3.jpg',
    descricao: 'Hábitos e ideias para pensar e trabalhar melhor com tecnologia.' },
]

export const statusLabel = { concluido: 'Concluído', atual: 'Lendo agora', proximo: 'Em breve' }
