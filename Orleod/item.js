/* 
    Sprite
    prefix = s / S
*/

function Item(name, icon, paperdoll, type)
{
    this.name = name;
    this.icon = icon;
    this.paperdoll = paperdoll;
    this.type = type;
}

var items = 
[
    new Item('Cloth Armor', 27 * 16 + 1, 0, EQUIP_ARMOR),
    new Item('Iron Helmet', 28 * 16 + 10, 1, EQUIP_HEAD)
];