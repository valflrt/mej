import turtle, argparse

# Fonction qui inverse l'ordre d'une liste et qui remplace
# les 0 par des 1 et les 1 par des 0
def inverser_seq(seq):
    return [(1 if e == 0 else 0) for e in seq][::-1]

# Fonction de récurrence pour obtenir les angles à un certain
# rang n (similaire au suite définies par récurrence en
# mathématiques)
A0 = []
def A(n):
    return inverser_seq(A(n - 1)) + [0] + A(n - 1) if n > 0 else A0

def dessiner_sequence(n = 1, seg_len = 20, show_angles = False, capture = False):
    if n < 1:
        print("Attention: impossible de tracer une figure avec moins de 1 pliage (n ne doit pas être plus petit que 1)")
        return

    angles = A(n)
    nb_angles = len(angles)
    nb_segments = 2 ** n

    if show_angles == True:
        print("angles:", angles)
    print(n, "pliages,", nb_angles, "angles,", nb_segments, "segments")

    # obtient les angles de la figure au rang n - 1, pour
    # pouvoir placer le "centre" de la figure au point (0, 0)
    # (la figure à un certain rang est simplement la figure
    # au rang n - 1 dessinée en partant du même point mais
    # avec un angle de 90°)
    prev_angles = A(n - 1)

    # cache la turtle
    turtle.hideturtle()
    # empêche turtle de prendre trois plombes à faire la figure
    turtle.tracer(0, 0)

    maximums = (0, 0, 0, 0) # 0: min_x, 1: min_y, 2: max_x, 3: max_y
    def get_maximums(x, y):
        return (
            int(x) if maximums[0] > x else maximums[0],
            int(y) if maximums[1] > y else maximums[1],
            int(x) if maximums[2] < x else maximums[2],
            int(y) if maximums[3] < y else maximums[3]
        )

    # dessine la figure au rang n - 1 deux fois avec un angle
    # à 90° entre les deux pour former la figure au rang n
    for _ in range(2):
        turtle.goto(0, 0)
        turtle.pendown()
        for i in range(len(prev_angles)):
            turtle.forward(seg_len)
            maximums = get_maximums(turtle.xcor(), turtle.ycor())
            if prev_angles[i] == 0:
                turtle.right(90)
            else:
                turtle.left(90)
        if len(prev_angles) == 0:
            turtle.left(90)
        turtle.forward(seg_len)
        turtle.penup()

    # marque le milieu de la figure avec un point bleu
    turtle.goto(0, 0)
    turtle.dot(4, "red")

    # affiche la figure
    turtle.update()

    # L’algorithme ne calcule pas correctement la taille de
    # la figure avant le rang 3
    if n > 2:
        print("taille quadrillage:", int((maximums[2] - maximums[0]) / seg_len), "x", int((maximums[3] - maximums[1]) / seg_len))

    # sauvegarde une "image" si demandé
    if capture == True:
        screen = turtle.getscreen()
        screen.getcanvas().postscript(file="img.eps")

    # garde la fenêtre turtle ouverte
    turtle.mainloop()

# ne pas mettre un nombre trop grand pour n parce que sinon
# le pc aime pas
dessiner_sequence(n = 11, seg_len = 5)

# parser = argparse.ArgumentParser()

# parser.add_argument("n")
# parser.add_argument("-s", "--segment_len", default = 20)
# parser.add_argument("-a", "--show-angles", action="store_true", default = False)
# parser.add_argument("-c", "--capture", action="store_true", default = False)

# args = parser.parse_args()

# dessiner_sequence(int(args.n), int(args.segment_len), bool(args.show_angles), bool(args.capture))