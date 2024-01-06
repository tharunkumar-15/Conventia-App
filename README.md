# Conventia
Alzheimer is a type of dementia which primarily causes thinking, remembering, reasoning, and behavioral abnormalities. People with Alzheimer tend to forget the memories such as their conversations with people which leads to incomplete activities, repetition of conversation, increased burden on caregivers.

A common strategy is to develop an app that will aid Alzheimer patients in remembering the past. Our proposed system is a user-friendly React Native application for people with Alzheimer to identify the person and then record, store and narrate the conversations made.

## Key Features ##
* Face recognition feature to identify and remember the person.
* Speaker Diarization feature to identify different speakers in an audio recording.
* An application that stores conversation automatically.
* Summarized storage of large conversations.
* Easy access to previous conversations.

## Tech Stack and Algorithms Used ##
### Tech Stack ###
* __Framework:__ React Native, Flask
* __Developer Tool:__ Google Firebase

### Algorithms Used ###
* __Face Recognition:__ FaceNet
* __Speaker Diarization:__ Pyannote
* __Summarization of text:__ SpaCy

## Working of Conventia App ##
<p align="center">
<img width="560" alt="Start Page" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/2f631e14-5988-42cf-b42f-61bdbf0bbaa4">
</p>
<p align="center"><b>Process flow of the System</b></p>
<p align="justify">
The caregiver initially stores pictures of the person's face who needs to be identified and whose conversations must be recorded in the app. Before the start of the conversation the app initially performs face-recognition and narrates the details of the person (name, relationship etc.) to the Alzheimer patient. If the Alzheimer patient requests the app for previous conversations through voice input, then the app accesses the recent previous conversations and narrates it to the user. The recording of the current conversation begins by clicking start recording button in the app. Voice detection is performed to convert the input conversation between the Alzheimer patient and the other person into text. As the conversations can go for very long time, the text converted conversation is then sent to the text summarization algorithm which gives the summary of the conversation as the output. The summarized conversation is stored in the database which will become a previous conversation in their next encounter. The Alzheimer patient can access all the previous conversations in the app. The previous conversations are stored under the person with whom the conversation was made. This assists the Alzheimer patient to remember important past conversation and to identify the person.
</p>

## Glimpse of Conventia App ##
<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/66e54d63-4eca-4e53-b6e7-488bdab7a75a">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/1e49f84b-3fbf-4a20-bae2-2e15c02847cc">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/d903e787-0b28-43db-bfc3-68966038830e">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/284fda44-d3b4-47ae-8c6c-94d899efd223">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/013da71d-d73e-4b45-8012-3daf0b673b2c">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/41b78c99-5aa2-404e-af5c-9f66fb75c5f3">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/efa4c71a-df54-4558-b2ff-8e7401993aa0">
</p>

<p align="center">
<img width="940" alt="Conventia App" src="https://github.com/tharunkumar-15/Conventia-App/assets/67571677/4115acfd-793d-4255-9f34-2c83d578ecaf">
</p>
