/* 
    GUI
*/

function Inventory()
{
    this.visible = false;
    this.width   = 198;
    this.height  = 201;
    this.x       = 800 - this.width  - 16;
    this.y       = 600 - this.height - 16;
    this.hook    = false;
    this.hookVec = [ 0, 0 ];
    
    this.MouseDown = function(button, x, y)
    {
        if (this.visible && x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
        {
            if (y < this.y + 20)
            {
                this.hook = true;
                this.hookVec[0] = x - this.x;
                this.hookVec[1] = y - this.y;
            }
            else
            {
                for (var i = 0; i < PLAYER_INV_SIZE; i++)
                {
                    if (player.slots[i] != -1)
                    {
                        var item = items[player.slots[i]];
                        
                        var x = this.x + 11 + (i % 5) * 38;
                        var y = this.y + 30 + Math.floor(i / 5) * 38;
                        
                        if (mouseX > x && mouseX < x + 24 && mouseY > y && mouseY < y + 24)
                        {
                            var temp = player.equip[item.type];
                            player.equip[item.type] = player.slots[i];
                            player.slots[i] = temp;
                        }
                    }
                }
            }
        }
    };
    
    this.MouseUp = function(button, x, y)
    {
        this.hook = false;
    };
    
    this.MouseMove = function(x, y)
    {
        if (this.visible && this.hook)
        {
            this.x = x - this.hookVec[0];
            this.y = y - this.hookVec[1];
        }
    };
    
    this.Render = function(context)
    {
        if (this.visible)
        {
            context.drawImage(img_gui, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
            
            context.font = '10px Verdana';
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('Inventory', this.x + this.width / 2,  this.y + 14);
            
            context.textAlign = 'left';
            context.fillText(player.gold.toString(), this.x + 30, this.y + 189);
            
            
            var itemUnderMouse = -1;
            for (var i = 0; i < PLAYER_INV_SIZE; i++)
            {
                if (player.slots[i] != -1)
                {
                    var item = items[player.slots[i]];
                    
                    var x = this.x + 11 + (i % 5) * 38;
                    var y = this.y + 30 + Math.floor(i / 5) * 38;
                    
                    // 7, 26
                    context.drawImage(img_icons, (item.icon % 16) * 24, Math.floor(item.icon / 16) * 24, 24, 24, x, y, 24, 24);
                
                    if (mouseX > x && mouseX < x + 24 && mouseY > y && mouseY < y + 24)
                        itemUnderMouse = i;
                }
            }
            
            if (itemUnderMouse != -1)
                context.fillText(items[player.slots[itemUnderMouse]].name, mouseX + 8, mouseY + 5)
        }
    };
}

function CharacterPanel()
{
    this.visible = false;
    this.width   = 160;
    this.height  = 178;
    this.x       = 800 - this.width  - 16;
    this.y       = 600 - this.height - 16;
    this.hook    = false;
    this.hookVec = [ 0, 0 ];
    
    this.MouseDown = function(button, x, y)
    {
        if (this.visible && x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
        {
            if (y < this.y + 20)
            {
                this.hook = true;
                this.hookVec[0] = x - this.x;
                this.hookVec[1] = y - this.y;
            }
            else
            {
                for (var i = 0; i < EQUIP_SIZE; i++)
                {
                    if (player.equip[i] != -1)
                    {
                        var item = items[player.equip[i]];
                        
                        var x = this.x + 11 + i * 38;
                        var y = this.y + 144;
                        
                        if (mouseX > x && mouseX < x + 24 && mouseY > y && mouseY < y + 24)
                        {
                            var slot = PLAYER_INV_SIZE;
                            for (var j = 0; j < PLAYER_INV_SIZE; j++)
                            {
                                if (player.slots[j] == -1)
                                {
                                    slot = j;
                                    break;
                                }
                            }
                            if (slot != PLAYER_INV_SIZE)
                            {
                                player.slots[slot] = player.equip[i];
                                player.equip[i] = -1;
                            }
                            return;
                        }
                    }
                }
            }
        }
            
    };
    
    this.MouseUp = function(button, x, y)
    {
        this.hook = false;
    };
    
    this.MouseMove = function(x, y)
    {
        if (this.visible && this.hook)
        {
            this.x = x - this.hookVec[0];
            this.y = y - this.hookVec[1];
        }
    };
    
    this.Render = function(context)
    {
        if (this.visible)
        {
            context.drawImage(img_gui, 198 + 32, 0, this.width, this.height, this.x, this.y, this.width, this.height);
            
            context.font = '10px Verdana';
            context.textAlign = 'center';
            context.fillStyle = 'white';
            context.fillText('Character', this.x + this.width / 2,  this.y + 14);
            
            context.drawImage(img_faces[0], 0, 96, 96, 96, this.x + this.width / 2 - 48, this.y + 32, 96, 96);
            
            context.textAlign = 'left';
            
            var itemUnderMouse = -1;
            for (var i = 0; i < EQUIP_SIZE; i++)
            {
                if (player.equip[i] != -1)
                {
                    var item = items[player.equip[i]];
                    
                    var x = this.x + 11 + i * 38;
                    var y = this.y + 144;
                    
                    context.drawImage(img_icons, (item.icon % 16) * 24, Math.floor(item.icon / 16) * 24, 24, 24, x, y, 24, 24);
                    
                    if (mouseX > x && mouseX < x + 24 && mouseY > y && mouseY < y + 24)
                        itemUnderMouse = i;
                }
            }
            
            if (itemUnderMouse != -1)
                context.fillText(items[player.equip[itemUnderMouse]].name, mouseX + 8, mouseY + 5)
        }
    };
}

function PanelButton(index, icon, onclick)
{
    this.x       = 16 + 48 * index;
    this.y       = 600 - 48;
    this.icon    = icon;
    this.state   = 0;
    this.onclick = onclick;
    
    this.MouseDown = function(button, x, y)
    {
        if (x > this.x && x < this.x + 32 && y > this.y && y < this.y + 32)
        {
            if (this.state == 1)
                this.state = 2;
        }
    };
    
    this.MouseUp = function(button, x, y)
    {
        if (x > this.x && x < this.x + 32 && y > this.y && y < this.y + 32)
        {
            if (this.state == 2)
            {
                this.state = 1;
                
                onclick();
            }
        }
        else
        {
            this.state = 0;
        }
    };
    
    this.MouseMove = function(x, y)
    {
        if (x > this.x && x < this.x + 32 && y > this.y && y < this.y + 32)
        {
            if (this.state == 0)
                this.state = 1;
        }
        else
        {
            if (this.state == 1)
                this.state = 0;
        }
    };
    
    this.Render = function(context)
    {
        var offsets = [ 0, -1 , 1 ];
        
        context.drawImage(img_gui, 198, this.state * 32, 32, 32, this.x, this.y, 32, 32);
        
        context.drawImage(img_icons, (this.icon % 16) * 24, Math.floor(this.icon / 16) * 24, 24, 24, this.x + 4, this.y + 4 + offsets[this.state], 24, 24);
    };
}

var widgets = 
[ 
    new Inventory(),
    new CharacterPanel(),
    new PanelButton(0, 264, function() { widgets[0].visible = !widgets[0].visible; }),
    new PanelButton(1, 28 * 16 + 11, function() { widgets[1].visible = !widgets[1].visible; })
];
