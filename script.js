console.log("Hello Brothers");

const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  // console.log(data.data.tools);
  displaydata(data.data.tools);
};

const displaydata = (tools) => {
  // console.log(tools);
  const toolsCotainer = document.getElementById("item-container");

  tools.forEach((tool) => {
    console.log(tool);
    const toolsCard = document.createElement("div");
    toolsCard.classList.add("card", "card-compact", "bg-base-100", "shadow-xl", "py-4");

    toolsCard.innerHTML = `
                 <figure class="mx-4 md:h-[300px] rounded-lg">
              <img
                class="w-full h-full object-cover"
                src="${tool.image}"
              />
            </figure>
            <div class="card-body">
              <div class="">
                <h2 class="card-title">Feautures</h2>
  
                <ol class="list-decimal mx-4">
               
                ${tool.features.map(element => `<li>${element}</li>`).join('')}
                
              </ol>
  
                <hr class="my-4 border mx-auto" />
              </div>
  
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="card-title">${tool.name}</h2>
                  <p>
                    <i class="fa-duotone fa-solid fa-calendar-days"></i>
                    <span class="ml-2 text-slate-500">${tool.published_in}</span>
                  </p>
                </div>
  
                <div class="card-actions justify-end">
                  <button class="w-12 h-12 bg-red-50 rounded-full">
                    <i class="fa-sharp fa-solid fa-arrow-right text-red-500"></i>
                  </button>
                </div>
              </div>
            </div>
        `;
    toolsCotainer.appendChild(toolsCard);
  });
};

loadData();
