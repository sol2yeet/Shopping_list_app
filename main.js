/* //어떤 기능을 구현할건지 생각해보기 자가 +버튼을 클릭하거나 엔터키를 치면 아이템을 등록한다
등록한 아이템은 스크롤링이 되는 칸에
 * 등록된다.
등록된 아이콘은 쓰레기통 아이콘을 누르면 삭제된다.
 */

const items = document.querySelector('.items'); //container
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__btn');

// 사용자가 add버튼을 눌렀을 때 이벤트를 처리하는 함수는 on을 붙인다. (ex. onClick, onAdd, onDelete)
function onAdd() {

    //1. 사용자가 입력한 텍스트를 받아오기
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }

    //2. 받아온 텍스트를 이용해서 새로운 아이템 만들기(텍스트 +, 삭제버튼)
    const item = createItem(text);
    //3. items 컨테이너 안에 새로 만든 아이템을 추가한다 (API) 3-1. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block: 'center'})

    items.appendChild(item);
    //4. 인풋을 초기화하고 커서를 입력창에 표시한다.
    input.value = '';
    input.focus();
}

//리액트를 쓰면 일일이 작성할일이 없음


let id = 0; //UUID
function createItem(text) {
    const itemRow = document.createElement("li");
    itemRow.setAttribute('class', 'item__row')
    itemRow.setAttribute('data-id', id)
    itemRow.innerHTML = `
                    <div class="item" data-id=${id}>
                        <span class="item__name">${text}</span>
                        <button class="item__delete" >
                            <i class="fas fa-trash-alt" data-id=${id}></i>
                        </button>
                    </div>
                    <div class="item__divider"></div>                
                    `;
                    id++;
    return itemRow;
}

//버튼을 클릭했을때 이벤트가 발생한다.
addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        onAdd();
    }
})

items.addEventListener('click', event =>{
const id = event.target.dataset.id;
    if(id){
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`)
    toBeDeleted.remove();
    }
})
