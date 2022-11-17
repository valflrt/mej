import turtle

def inverser_seq(seq):
    # crée une liste vide
    inv = []
    for nb in seq:
        # remplace les zéros par des uns et inversement
        inv.append(1 if nb == 0 else 0)
    return inv[::-1] # [::-1] retourne le tableau

def obtenir_seq(n):
    # fonction de recurrence pour determiner la sequence
    def recurse(seq = [], i = 0):
        next_seq = inverser_seq(seq) + [0] + seq
        return (next_seq, len(next_seq), len(next_seq) + 1) if i == n else recurse(next_seq,  i + 1)
    return recurse()

def dessiner_sequence(n = 1, seg_len = 20, capture = False, show_angles = False):
    if n < 1:
        print("Attention: impossible de tracer une figure avec moins de 1 pliage (n ne doit être plus petit que 1)")
        return

    # obtenir les info de la figure au rang n, de la sequence
    # et sa longueur
    (angles, nb_angles, nb_segments) = obtenir_seq(n - 1)

    if show_angles == True:
        print("angles:", angles)
    print("nombre de pliages: ", n)
    print("nombre d'angles:   ", nb_angles)
    print("nombre de segments:", nb_segments)

    # obtient les angles de la figure au rang n - 1, pour
    # pouvoir placer le centre de la figure au point (0, 0)
    # (la figure à un certain rang est simplement la figure
    # au rang n - 1 dessinée en partant du même point mais
    # avec un décalage angulaire de 90°)
    angles = obtenir_seq(n - 2)[0] if n - 1 != 0 else []

    # paramètres de turtle
    turtle.hideturtle()
    turtle.color("#FF006F") # du rose :D

    # empêche turtle de prendre trois plombes à faire la figure
    turtle.tracer(0, 0)

    min_x = 0
    min_y = 0
    max_x = 0
    max_y = 0

    # dessine la demi-figure deux fois pour former la figure
    # complète (retour à l'origine et rotation de 90° incluse)
    for _ in range(2):
        turtle.goto(0, 0)
        turtle.pendown()
        for i in range(len(angles)):
            turtle.forward(seg_len)
            min_x = int(turtle.xcor()) if min_x > turtle.xcor() else min_x
            min_y = int(turtle.ycor()) if min_y > turtle.ycor() else min_y
            max_x = int(turtle.xcor()) if max_x < turtle.xcor() else max_x
            max_y = int(turtle.ycor()) if max_y < turtle.ycor() else max_y
            if angles[i] == 0:
                turtle.right(90)
            else:
                turtle.left(90)
        if len(angles) == 0:
            turtle.left(90)
        turtle.forward(seg_len)
        turtle.penup()

    # marque le milieu de la figure avec un point bleu
    turtle.goto(0, 0)
    turtle.dot(6, "blue")

    # affiche la figure
    turtle.update()

    # sauvegarde une image si demandé
    if capture == True:
        screen = turtle.getscreen()
        screen.getcanvas().postscript(file="img.eps")

    print("taille quadrillage:", int((max_x - min_x) / seg_len), "x", int((max_y - min_y) / seg_len))

    # garde la fenêtre turtle ouverte
    turtle.mainloop()

# ne pas mettre un nombre trop grand pour n parce que sinon
# le pc aime pas
dessiner_sequence(n = 12, seg_len = 1, show_angles = True)
