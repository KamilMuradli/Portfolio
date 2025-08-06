"""Simple rule-based lemmatizer for Azerbaijani language."""

from __future__ import annotations


class AzerbaijaniLemmatizer:
    """A minimal rule-based lemmatizer for Azerbaijani.

    The lemmatizer removes a set of frequent inflectional suffixes such as
    plural markers and possessive endings.  It is intentionally lightweight and
    suitable for small experiments or as a starting point for more advanced
    natural language processing projects.
    """

    COMMON_SUFFIXES = [
        "larının", "lərinin",
        "larımız", "lərimiz",
        "larım", "lərim",
        "ların", "lərin",
        "lara", "lərə",
        "larda", "lərdə",
        "lardan", "lərdən",
        "ları", "ləri",
        "lar", "lər",
        "ımız", "imiz", "umuz", "ümüz",
        "ım", "im", "um", "üm",
        "ın", "in", "un", "ün",
        "nı", "ni", "nu", "nü",
        "da", "də", "dan", "dən",
        "a", "ə",
    ]

    def __init__(self, dictionary: dict[str, str] | None = None) -> None:
        self.dictionary = dictionary or {}

    def lemmatize(self, word: str) -> str:
        """Return the lemma for *word*.

        Parameters
        ----------
        word:
            Token in Azerbaijani language.

        Returns
        -------
        str
            Lemma form of *word*.
        """
        if not word:
            return word

        lemma = word.lower()

        if lemma in self.dictionary:
            return self.dictionary[lemma]

        changed = True
        while changed:
            changed = False
            for suffix in sorted(self.COMMON_SUFFIXES, key=len, reverse=True):
                if lemma.endswith(suffix) and len(lemma) > len(suffix) + 1:
                    lemma = lemma[: -len(suffix)]
                    changed = True
                    break

        return self.dictionary.get(lemma, lemma)
