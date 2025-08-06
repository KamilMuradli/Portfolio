import os
import sys

# Add package root to path for direct execution without installation
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from az_lemmatizer import AzerbaijaniLemmatizer


def test_plural():
    lemmatizer = AzerbaijaniLemmatizer()
    assert lemmatizer.lemmatize("kitablar") == "kitab"


def test_possessive_plural():
    lemmatizer = AzerbaijaniLemmatizer()
    assert lemmatizer.lemmatize("kitablarımın") == "kitab"


def test_locative_case():
    lemmatizer = AzerbaijaniLemmatizer()
    assert lemmatizer.lemmatize("evlərdə") == "ev"


def test_dictionary_override():
    lemmatizer = AzerbaijaniLemmatizer({"oldum": "ol"})
    assert lemmatizer.lemmatize("oldum") == "ol"
