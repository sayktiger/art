const accardion = (triggerSelector, blockSelector) =>{
    const btns = document.querySelectorAll(triggerSelector),
        blocks = document.querySelectorAll(blockSelector);

    blocks.forEach(block =>{
        block.classList.add(`animated`, `fadeInUp`);
    });

    btns.forEach(btn =>{
        btn.addEventListener(`click`, function(){
            if(!this.classList.contains(`active`)){
                btns.forEach(btn =>{
                    btn.classList.remove(`active`, `active-style`);
                });
            }
            this.classList.add(`active`, `active-style`);
        });
    });
};

export default accardion;