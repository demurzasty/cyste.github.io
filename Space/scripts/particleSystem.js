/**
 * Created by Mariusz on 11/7/2016.
 */

var particleSystem = {
    emitters: [],
    fields: [],
    mouseField: new Field(0, 0),
    sectors: [],
    particles: new Array(65536),
    index: 0,

    emit: function(x, y, dx, dy) {
        if (!this.particles[this.index]) {
            this.particles[this.index] = new Particle();
        }

        this.particles[this.index].x = x;
        this.particles[this.index].y = y;
        this.particles[this.index].dx = dx;
        this.particles[this.index].dy = dy;
        this.particles[this.index].use = true;

        this.index = (this.index + 1) % this.particles.length;
    },

    update: function (deltaTime) {
        var i;
        for (i = 0; i < this.emitters.length; ++i) {
            this.emitters[i].update(deltaTime);
        }

        // this.mouseField.update(deltaTime);
        /*
        for (i = 0; i < this.fields.length; ++i) {
            this.fields[i].update(deltaTime);
        }
*/

        for (i = 0; i < this.particles.length; ++i) {
            if (this.particles[i] && this.particles[i].use) {
                this.particles[i].update(deltaTime);

                if (this.particles[i].x < 0.0 || this.particles[i].x > game.canvas.width ||
                    this.particles[i].y < 0.0 || this.particles[i].y > game.canvas.height) {
                    this.particles[i].use = false;
                    //this.particles.splice(i--, 1);
                }
            }
        }
    },

    render: function() {
        var i;
        for (i = 0; i < this.emitters.length; ++i) {
            this.emitters[i].render();
        }

        for (i = 0; i < this.fields.length; ++i) {
            this.fields[i].render();
        }

        for (i = 0; i < this.particles.length; ++i) {
            if (this.particles[i] && this.particles[i].use) {
                this.particles[i].render();
            }
        }

        //context.font = '12px Verdana';
        //context.fillStyle = 'white';
        //context.fillText('Particles: ' + this.particles.length, 0, 12);
    },

    updateSectors: function() {
        var i, j, n, m;
        var square = [
            { x: 0, y: 0 },
            { x: 0, y: Sector.size },
            { x: Sector.size, y: Sector.size },
            { x: Sector.size, y: 0 }
        ];

        for (i = 0; i < this.sectors.length; ++i) {
            for (j = 0; j < this.sectors[i].length; ++j) {
                this.sectors[i][j].fields = [];
                for (n = 0; n < this.fields.length; ++n) {
                    for (m = 0; m < 4; ++m) {
                        var diffX = (square[m].x - this.fields[n].x);
                        var diffY = (square[m].y - this.fields[n].y);
                       // console.log('diffX: ', diffX, 'diffY: ', diffY);
                        if (Math.sqrt(diffX * diffX + diffY * diffY) <= this.fields[n].distance) {
                            this.sectors[i][j].fields.push(n);
                           // console.log('asdsad');
                            break;
                        }
                    }
                }
                square[0].y += Sector.size;
                square[1].y += Sector.size;
                square[2].y += Sector.size;
                square[3].y += Sector.size;
            }
            square[0].x += Sector.size;
            square[1].x += Sector.size;
            square[2].x += Sector.size;
            square[3].x += Sector.size;
            square[0].y = 0;
            square[1].y = Sector.size;
            square[2].y = Sector.size;
            square[3].y = 0;
        }

        console.log('Sectors updated!');
    },

    resize: function(width, height) {
        var i, j, n;

        width = ((width / Sector.size) | 0);
        height = ((height / Sector.size) | 0);

        this.sectors = new Array(width);
        for (i = 0; i < width; ++i) {
            this.sectors[i] = new Array(height);
            for (j = 0; j < height; ++j) {
                this.sectors[i][j] = new Sector();
            }
        }

        this.updateSectors();
    },

    addField: function(field) {
        this.fields.push(field);
    }
};

