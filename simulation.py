import turtle


# Fonction de récurrence pour obtenir la liste des angles à
# un certain rang n (similaire au suite définies par récurrence
# en mathématiques)
A0 = []


def A(n):
    return inv(A(n - 1)) + [0] + A(n - 1) if n > 0 else A0


# Prévision des dimensions de la figure pour un rang pair
# (DP = Dimensions Paires)
DP2 = (1, 2)


def DP(n):
    (d1, d2) = DP(n - 2) if n > 2 else DP2
    print(n, (d1, d2))
    return (d1 * 2 + 1, d2 * 2 + 1)


# Prévision des dimensions de la figure pour un rang impair
# (DI = Dimensions Impaires)
DI1 = (1, 1)


def DI(n):
    (d1, d2) = DI(n - 2) if n > 2 else DI1
    print(n, (d1, d2))
    return (d1 * 2, d2 * 2 + 1) if n % 4 == 1 else (d1 * 2 + 2, d2 * 2 + 1)


# "Rassemble" les prévisions pour les rangs pairs et impairs
def D(n):
    return DP(n - 2) if n % 2 == 0 else DI(n - 2)


# Fonction qui inverse l'ordre d'une liste d'angles et qui
# remplace les 0 par des 1 et les 1 par des 0
def inv(fig):
    return [(1 if v == 0 else 0) for v in fig][::-1]


def simulation(n, seg_len=10, show_angles=False, capture=False):
    if n < 1:
        print(
            "Attention: impossible de tracer une figure avec moins de 1 pliage (n ne doit pas être plus petit que 1)"
        )
        return

    angles = A(n)
    nb_angles = len(angles)
    nb_segments = 2**n

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

    maximums = (0, 0, 0, 0)  # 0: min_x, 1: min_y, 2: max_x, 3: max_y

    def get_new_maximums(x, y):
        return (
            int(x) if maximums[0] > x else maximums[0],
            int(y) if maximums[1] > y else maximums[1],
            int(x) if maximums[2] < x else maximums[2],
            int(y) if maximums[3] < y else maximums[3],
        )

    turtle.right(90)
    # dessine la figure au rang n - 1 deux fois avec un angle
    # à 90° entre les deux pour former la figure au rang n
    for _ in range(2):
        turtle.goto(0, 0)
        turtle.pendown()
        for i in range(len(prev_angles)):
            turtle.forward(seg_len)
            maximums = get_new_maximums(turtle.xcor(), turtle.ycor())
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

    print("taille du quadrillage calculée:", D(n))

    if n > 2:
        # Attention le calcul graphique n'est pas précis (une
        # erreur d'une unité est parfois constatée)
        print(
            "taille approximative du quadrillage trouvée graphiquement:",
            (
                int((maximums[2] - maximums[0]) / seg_len),
                int((maximums[3] - maximums[1]) / seg_len),
            ),
        )

    # sauvegarde une "image" si demandé
    if capture == True:
        screen = turtle.getscreen()
        screen.getcanvas().postscript(file="img.eps")

    # garde la fenêtre turtle ouverte
    turtle.done()


simulation(
    n=int(input("Nombre de pliages: ")), seg_len=int(input("Longueur des segments: "))
)
# ne pas mettre un nombre trop grand pour n sinon le pc aime
# pas
# dessiner_figure(n = 12, seg_len = 5)
