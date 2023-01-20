const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
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
                windows.forEach(item =>{
                    item.style.display = `none`;
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
            if(e.target === modal && closeClickOverlay){
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

    bindModals(`.button-design`, `.popup-design`, `.popup-design .popup-close`);
    bindModals(`.button-consultation`, `.popup-consultation`, `.popup-consultation .popup-close`);
    // showModalBindTime(`.popup-consultation` , 60000);
};

export default modals;