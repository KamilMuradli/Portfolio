# Azerbaijani Lemmatizer

A minimal rule-based lemmatizer for the Azerbaijani language implemented in
Python. The lemmatizer strips a set of common inflectional suffixes such as
plural markers, possessive endings and basic case affixes.  It can also be
extended with a custom dictionary of irregular forms.

## Usage

```python
from az_lemmatizer import AzerbaijaniLemmatizer

lemmatizer = AzerbaijaniLemmatizer()
print(lemmatizer.lemmatize("kitablar"))  # -> "kitab"
```

## Testing

Run the unit tests with `pytest`:

```bash
pytest
```
