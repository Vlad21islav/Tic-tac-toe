import pygame
import sys

sc = pygame.display.set_mode((500, 500), flags=pygame.RESIZABLE)
size = (0, 0)


sq_x = 0
sq_y = 0

cells = ['' for i in range(9)]

xs = []
os = []

turn = 'x'


def draw_x(x_x, x_y, x_width, x_height):
    pygame.draw.polygon(sc, 'black', [[x_x + 0, x_y + 0], [x_x + x_width // 6 * 1, x_y + 0], [x_x + x_width // 6 * 3, x_y + x_height // 6 * 2], [x_x + x_width // 6 * 5, x_y + 0],
                                      [x_x + x_width, x_y + 0], [x_x + x_width, x_y + x_height // 6 * 1], [x_x + x_width // 6 * 4, x_y + x_height // 6 * 3], [x_x + x_width, x_y + x_height // 6 * 5],
                                      [x_x + x_width, x_y + x_height], [x_x + x_width // 6 * 5, x_y + x_height], [x_x + x_width // 6 * 3, x_y + x_height // 6 * 4],
                                      [x_x + x_width // 6 * 1, x_y + x_height],
                                      [x_x + 0, x_y + x_height], [x_x + 0, x_y + x_height // 6 * 5], [x_x + x_width // 6 * 2, x_y + x_height // 6 * 3], [x_x + 0, x_y + x_height // 6]])


def draw_o(o_x, o_y, o_width, o_height):
    pygame.draw.circle(sc, 'black', (o_x + o_width // 2, o_y + o_height // 2), (o_width + o_height) // 4, o_width // 10)


while True:
    if size != pygame.display.get_window_size():
        size = pygame.display.get_window_size()

        if min(size) == size[0]:
            sq_x = 0
            sq_y = (max(size) - min(size)) // 2
        elif size[0] == size[1]:
            sq_x = 0
            sq_y = 0
        else:
            sq_x = (max(size) - min(size)) // 2
            sq_y = 0

    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            sys.exit()

    sc.fill((29, 32, 37))
    mouse = pygame.mouse.get_pos()

    for x in range(3):
        for y in range(3):
            cells = ['' for i in range(9)]
            for i in xs:
                cells[i] = 'x'
            for i in os:
                cells[i] = 'o'

            count = x * 3 + y
            rect = pygame.draw.rect(sc, 'white', (sq_x + min(size) // 11 * 4 * x, sq_y + min(size) // 11 * 4 * y, min(size) // 11 * 3, min(size) // 11 * 3))
            if cells[count] == 'x':
                draw_x(sq_x + min(size) // 11 * 4 * x, sq_y + min(size) // 11 * 4 * y, min(size) // 11 * 3, min(size) // 11 * 3)
            elif cells[count] == 'o':
                draw_o(sq_x + min(size) // 11 * 4 * x, sq_y + min(size) // 11 * 4 * y, min(size) // 11 * 3, min(size) // 11 * 3)
            if cells[count] == '' and rect.collidepoint(mouse) and pygame.mouse.get_pressed()[0]:
                if turn == 'x':
                    xs.append(x * 3 + y)
                    if len(xs) > 3:
                        xs.pop(0)
                    turn = 'o'
                elif turn == 'o':
                    os.append(x * 3 + y)
                    if len(os) > 3:
                        os.pop(0)
                    turn = 'x'

    pygame.display.update()