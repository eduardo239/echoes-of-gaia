position=0
map=[]
queue=[]

<!-- init -->

efx()
setMap(generate_map())

<!-- primeira jogada -->

roll_dice()
x=random_number(1,6)
setMap(position + x)
check_position(position + x)

check_position(position)
switch
case enemy
setQueue(generate_random_queue(heroes, enemies))
start_battle(heroes, enemies)

start_battle()
check_first(queue)

check_first(queue)
if queue[0]
hero_playing()
else queue[1]
enemy_playing()

hero_playing()
if hit
attack(x) get x from click
reorder_queue(queue)

enemy_playing()
x=random_item(heroes)
attack(x)
reorder_queue(queue)

reorder_queue(queue)
x=queue.shift()
queue.push(x)
check_first(queue)
