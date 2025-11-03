# Tests

Test-Suite für Dominium Sociale

## Struktur
```
tests/
├── test_models/      # Model Tests
├── test_services/    # Service Tests (Business-Logik)
└── test_presentation/ # Integration Tests (API/UI)
```

## Tests ausführen
```bash
# Alle Tests
pytest

# Nur Models
pytest tests/test_models/

# Mit Coverage
pytest --cov=src
```
