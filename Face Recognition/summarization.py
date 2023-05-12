import spacy
from spacy.lang.en import English
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest


def perform_summarization(transcript):
    stopwords = list(STOP_WORDS)
    document1 = transcript
    document2 = transcript
    nlp = spacy.load("en_core_web_sm")
    docx = nlp(document1)
    mytokens = [token.text for token in docx]
    word_frequencies = {}
    for word in docx:
        if word.text not in stopwords:
            if word.text not in word_frequencies.keys():
                word_frequencies[word.text] = 1
            else:
                word_frequencies[word.text] += 1
    maximum_frequency = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = (word_frequencies[word]/maximum_frequency)
    sentence_list = [ sentence for sentence in docx.sents ]
    [w.text.lower() for t in sentence_list for w in t ]
    sentence_scores = {}
    for sent in sentence_list:
        for word in sent:
            if word.text.lower() in word_frequencies.keys():
                if len(sent.text.split(' ')) < 40:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word.text.lower()]
                    else:
                        sentence_scores[sent] += word_frequencies[word.text.lower()]
    summarized_sentences = nlargest(7, sentence_scores, key=sentence_scores.get)
    final_sentences = [ w.text for w in summarized_sentences ]
    # print(final_sentences)
    summary = ' '.join(final_sentences)
    print(summary)
    
    return summary

