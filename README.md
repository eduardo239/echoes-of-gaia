enemy {
nome, hp, mp, level, Tipo, imagem
}

hero {
nome, classe, level, experiência, força, inteligência,
hp, mp, maxHP, maxMP, ouro, imagem, arma, inventário
}

boss {
nome, classe, level, força, inteligência, hp, mp, avatar
}

item {
nome, valor, preço, tipo, imagem
}

TipoDeInimigo {
comum, fantasma, rocha, dragão, demon, undead,
}

TipoDeLocal {
nada, inimigo, chefe, item
}

TipoHero {
guerreiro, mago, feiticeira, arqueiro
}

<!-- contexto -->

hero, setHero
enemy, setEnemy
gift, setGift
boss, setBoss
inventory, setInventory

<!-- system -->

hero_list [ ]
enemy_list [ ]
stack_list [ ]

generate_random_places(range){
for x in (range)
selecionar um item de uma lista [TipoDeLocal]
// cria uma lista com vários locais no mapa

    if(item || inimigo)
        generate_random_number(1, 3)
        generate_random(inimigo)
        generate_random(item)

}

roll_the_dice() {
generate_random_number(1, 6)
}

check_actual_place(place) {
if place === nada
if place === inimigo
start_battle()
if place === item
get_random_item()
if place === chefe
start_boss_battle()

}

start_battle()
generate_random_number(0,1)
if 0 == hero
enable.hero_buttons
if 1 == enemy
disable.hero_buttons
hit()

hit()
if 1
generate_random_number(n, m)
hero.hp -= value
if 0
choose_enemy(index)
generate_random_number(n, m)
enemy[index].hp -= value

use_effect()
if hero.hp == 0
game_over()
[ hero ]

<!-- html -->

div.hero # atacar, inventário

div.map.enemy # click
div.map.item
div.boss
div.nada

<!-- mapa locais -->

[

- [nada]
- [inimigo, inimigo]
- [nada]
- [item, item, item]
- [boss]

]

<!-- itens -->

poção de cura pequeno {
nome = Small Heal Potion
cod = SM,
tipo = cura
valor = 90
preço = 45
}
poção de cura médio {
nome = Medium Heal Potion
cod = MD,
tipo = cura
valor = 120
preço = 60
}
poção de cura grande {
nome = Big Heal Potion
cod = BG,
tipo = cura
valor = 240
preço = 120
}

<!--  -->

poção de mana pequeno {
nome = Small Mana Potion
cod = SM,
tipo = mana
valor = 60
preço = 30
}
poção de mana médio {
nome = Medium Mana Potion
cod = MD,
tipo = mana
valor = 80
preço = 40
}
poção de mana grande {
nome = Big Mana Potion
cod = BG,
tipo = mana
valor = 120
preço = 60
}

<!--  -->

sacola de ouro pequeno {
nome = Small Gold Bag
preço = 0
tipo = ouro
valor = 50
}

sacola de ouro pequeno {
nome = Medium Gold Bag
preço = 0
tipo = ouro
valor = 150
}

sacola de ouro pequeno {
nome = Big Gold Bag
preço = 0
tipo = ouro
valor = 400
}

<!--  -->
