/**
  * Complete the implementation of parseStory.
  *
  * parseStory retrieves the story as a single string from story.txt
  * (I have written this part for you).
  *
  * In your code, you are required (please read this carefully):
  * - to return a list of objects
  * - each object should definitely have a field, `word`
  * - each object should maybe have a field, `pos` (part of speech)
  *
  * So for example, the return value of this for the example story.txt
  * will be an object that looks like so (note the comma! periods should
  * be handled in the same way).
  *
  * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
  * Output: [
  *  { word: "Louis", pos: "noun" },
  *  { word: "went", pos: "verb", },
  *  { word: "to", },
  *  { word: "the", },
  *  { word: "store", pos: "noun" }
  *  { word: "," }
  *  ....
  *
  * There are multiple ways to do this, but you may want to use regular expressions.
  * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
  */
function parseStory(rawStory) {
  // Your code here.
  let arrStory = rawStory.split(" ");
  let newArrStory = arrStory.map(e => {
    if (e.includes('[')) {
      //check if there is a bracket in the word element
      //get the index of the bracket from each element
      let indexOfBracket = e.indexOf('[');
      //split the element to extraxt bracket from it
      let word = e.slice(0, indexOfBracket);
      // let myRegex1 = /\[.*?\]/;// Change this line
      let regex1 = e.match(/\[.*?\]/);//[[n]]
      let regex2 = regex1.find(e => e.match(/.*/));//[n]
      let pos;

      if (regex2 === "[n]") {
        pos = "noun";
      }

      else if (regex2 === "[v]") {
        pos = "verb";
      }
      else if (regex2 === "[a]") {
        pos = "adjective";
      }
      else {
        pos = "adverb";
      }

      return { word: word, pos: pos };

    }
    else {
      return { word: e };

    }

  })
  return newArrStory;
}

/**
  * All your other JavaScript code goes here, inside the function. Don't worry about
  * the `then` and `async` syntax for now.
  *
  * NOTE: You should not be writing any code in the global namespace EXCEPT
  * declaring functions. All code should either:
  * 1. Be in a function.
  * 2. Be in .then() below.
  *
  * You'll want to use the results of parseStory() to display the story on the page.
  */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const madEdit = document.querySelector(".madLibsEdit");
    const madPreview = document.querySelector(".madLibsPreview");


    let editStory = processedStory.map((e, i) => {
      const inputWord = document.createElement('span');
      const outputWord = document.createElement('span');
      if ('pos' in e) {
        let input = document.createElement("input");
        input.id = `input${i}`;
        input.type = "text";
        input.placeholder = e.pos;
        input.maxLength = '20';
        outputWord.innerText = `(${e.pos}) `;
        outputWord.style.color = "white";
        input.addEventListener('input', function(ev) {
          if (input.value) {
            outputWord.textContent = `${input.value} `;
            // console.log(input.value);
          }
          else {
            outputWord.innerText = `(${e.pos}) `;
          }
        });

        madEdit.append(input);
        madPreview.append(outputWord);

      }
      else {
        // madEdit.textContent += `${e.word} `;
        inputWord.innerText = `${e.word} `;
        madEdit.append(inputWord);
        outputWord.innerText = `${e.word} `;
        outputWord.style.color = "#ff8c00";
        madPreview.append(outputWord);
      }

    });

    //------ Enter option
    // madEdit.addEventListener('keydown', function(ev) {
    //      if (ev.which === "Enter") {
    //        console.log(ev.target);
    //        const form = document.querySelectorAll('input')
    //        const index = [...form].indexOf(ev.target);
    //        form.elements[index + 1].focus();
    //      }
    //    });
    //----
    editStory;
  });




