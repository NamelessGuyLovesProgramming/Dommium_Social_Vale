import csv

points = []
with open('src/presentation/static/assets/excel/punkte.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            x_px = float(row['X (Pixel)'])
            y_px = float(row['Y (Pixel)'])
            points.append((x_px, y_px))
        except ValueError:
            continue

if not points:
    print("Keine Punkte gefunden!")
    exit()

min_x = points[0][0]
max_x = points[-1][0]
width = max_x - min_x
y_factor = 0.122

# Parameter für die untere Kurve
# Polygon läuft von rechts (P_last) nach links (P_first)
bottom_start_x = 85.0
bottom_end_x = 15.0
y_offset = 75.0 # Verschiebung nach unten (Oben Min ~4% -> Unten Min ~79%)

print("--- JS START ---")
print("const points = [")

# OBEN (Vorwärts: 0 -> 100%)
for i, (x, y) in enumerate(points):
    x_perc = (x - min_x) / width * 100
    y_perc = y * y_factor
    print(f'    {{ x: "{x_perc:.2f}%", y: "{y_perc:.2f}%" }}, // P{i} (Oben)')

# UNTEN (Rückwärts: 85% -> 15%)
# Wir iterieren rückwärts durch die Punkte, damit die Form erhalten bleibt
# P40 (Rechts oben) korrespondiert mit P_start_unten (Rechts unten)
reversed_points = list(reversed(points))

for i, (x, y) in enumerate(reversed_points):
    # Original X-Prozent (0..100)
    orig_x_perc = (x - min_x) / width # 0.0 bis 1.0
    
    # Mapping auf den Bereich 15..85
    # Wenn orig_x_perc = 1.0 (ganz rechts) -> ziel = 85%
    # Wenn orig_x_perc = 0.0 (ganz links) -> ziel = 15%
    
    current_x_perc = 15.0 + (orig_x_perc * (85.0 - 15.0))
    
    # Y-Berechnung
    # y_perc ist der relative Schwung. Wir addieren den Offset.
    y_perc = (y * y_factor) + y_offset
    
    # Index fortlaufend (41, 42...)
    idx = 41 + i
    print(f'    {{ x: "{current_x_perc:.2f}%", y: "{y_perc:.2f}%" }}, // P{idx} (Unten)')

print("];")
print("--- JS END ---")

print("--- CSS START ---")
print("clip-path: polygon(")
# OBEN
for i, (x, y) in enumerate(points):
    x_perc = (x - min_x) / width * 100
    y_perc = y * y_factor
    print(f'    {x_perc:.2f}% {y_perc:.2f}%,')

# UNTEN
for i, (x, y) in enumerate(reversed_points):
    orig_x_perc = (x - min_x) / width
    current_x_perc = 15.0 + (orig_x_perc * (85.0 - 15.0))
    y_perc = (y * y_factor) + y_offset
    
    comma = "," if i < len(reversed_points) - 1 else ""
    print(f'    {current_x_perc:.2f}% {y_perc:.2f}%{comma}')

print(");")
print("--- CSS END ---")