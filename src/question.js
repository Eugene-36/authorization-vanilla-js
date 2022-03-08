export class Question {
  static create(question) {
    return fetch(
      'https://ask-question-app-937aa-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
      {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((respons) => respons.json())
      .then((respons) => {
        question.id = respons.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }
  static renderList() {
    const questions = getQuestionsFromLocalStorage();
    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

    console.log('html', html);
    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem('qustions', JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('qustions') || '[]');
}

function toCard(qustion) {
  return `
<div class="mui--text-black-54">
 ${new Date(qustion.date).toLocaleDateString()}
 ${new Date(qustion.date).toLocaleTimeString()}

</div>
<div>${qustion.text}</div>
<br />
  `;
}
