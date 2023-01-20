const modals = () => {

    let btnPressed = false;

    function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false){
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll(`[data-modal]`),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener(`click`, (e) =>{
                if (e.targer){
                    e.preventDefault();
                }

                btnPressed = true;

                if(destroy){
                    item.remove();
                }
                windows.forEach(item =>{
                    item.style.display = `none`;
                    item.classList.add(`animated`, `fadeIn`);
                });
                
                
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                
            });

            
        });
        

        close.addEventListener(`click`, (e) =>{
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.marginRight = `0px`;
            windows.forEach(item =>{
                item.style.display = `none`;
            });
        });

        modal.addEventListener(`click`, (e) =>{
            if(e.target === modal){
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                document.body.style.marginRight = `0px`;
            }


        });
    }
    

    function showModalBindTime(selector, time){
        let display;

        document.querySelectorAll(`[data-modal]`).forEach(item =>{
            if(getComputedStyle(item).display !== `none`){
                display = "block"
            }
            if(!display){
                setTimeout(()=>{
                    scroll = calcScroll();
                    document.body.style.marginRight = `${scroll}px`;
                    document.querySelector(selector).style.display = `block`;
                    document.body.style.overflow = 'hidden';
                },time);
            }
        });
    };


    function calcScroll(){
        let div = document.createElement(`div`);

        div.style.width = `50px`;
        div.style.height = `50px`;
        div.style.overflowY = `scroll`;
        div.style.visibility = `hidden`;
        
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove()

        return scrollWidth;
    }

    function openByScroll(selector){
        window.addEventListener(`scroll`, () =>{
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if(!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight){
                document.querySelector(selector).click();
            }
        });
    }

    bindModals(`.button-design`, `.popup-design`, `.popup-design .popup-close`);
    bindModals(`.button-consultation`, `.popup-consultation`, `.popup-consultation .popup-close`);
    bindModals(`.fixed-gift`, `.popup-gift`, `.popup-gift .popup-close`, true);
    openByScroll(`.fixed-gift`);
    // showModalBindTime(`.popup-consultation` , 60000);
};

export default modals;