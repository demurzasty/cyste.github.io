
var img_sprites    = [];
var img_paperdolls = [];
var img_tilesets   = [];
var img_faces      = [];
var img_icons      = null;
var img_gui        = null;

var content_counter = 0;

function ImageOnLoad()
{
    content_counter++;
}

function IsContentLoaded()
{
    return content_counter == CONTENT_SIZE;
}

function LoadContent()
{
    for (var i = 0; i < MAX_IMG_SPRITES; i++)
    {
        img_sprites[i] = new Image();
        img_sprites[i].onload = ImageOnLoad;
        img_sprites[i].src = 'Assets/Sprites/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_PAPERDOLLS; i++)
    {
        img_paperdolls[i] = new Image();
        img_paperdolls[i].onload = ImageOnLoad;
        img_paperdolls[i].src = 'Assets/Paperdolls/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_TILESETS; i++)
    {
        img_tilesets[i] = new Image();
        img_tilesets[i].onload = ImageOnLoad;
        img_tilesets[i].src = 'Assets/Tilesets/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_FACES; i++)
    {
        img_faces[i] = new Image();
        img_faces[i].onload = ImageOnLoad;
        img_faces[i].src = 'Assets/Faces/' + i + '.png';
    }
    
    img_icons = new Image();
    img_icons.onload = ImageOnLoad;
    img_icons.src = 'Assets/Icons.png';
    
    img_gui = new Image();
    img_gui.onload = ImageOnLoad;
    img_gui.src = 'Assets/Interface.png';
}