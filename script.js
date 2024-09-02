console.log("Hello Brothers");

const loadData = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  // console.log(data.data.tools);
  displaydata(data.data.tools, isShowAll);
};

const displaydata = (tools, isShowAll) => {
  // console.log(tools);
  const toolsCotainer = document.getElementById("item-container");
  toolsCotainer.innerHTML = "";
  
  // only show 6 item
  if(!isShowAll) {
    tools  = tools.slice(0, 5);
  }
  

  tools.forEach((tool) => {
    // console.log(tool);
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
                  <button class="w-12 h-12 bg-red-50 rounded-full"  onclick="my_modal_4.showModal(); loadSingleData('${tool.id}')">
                    <i class="fa-sharp fa-solid fa-arrow-right text-red-500"></i>
                  </button>
                </div>
              </div>
            </div>
        `;
    toolsCotainer.appendChild(toolsCard);
  });
};


const showAllBtn = () => {
  console.log("got showall it");
  const btnDiv = document.getElementById("show-all-btn");
  btnDiv.classList.add('hidden');
  // console.log(btnDiv);
  loadData(true);
}

const loadSingleData = (id) => {
  // console.log("i got it", id);
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then(res => res.json())
  .then(data => displaySingle(data.data));
}

const displaySingle = (data) => {

  const {id, description, image_link, features} = data;
  const featuresList = [];
  
  for (const key in data.features){
    const featureName = (features[key]);
    featuresList.push(featureName.feature_name);
  }
  console.log(data.image_link[0]);
  

  // console.log(tool_name, description, image_link, features);

  const modal = document.getElementById("my_modal_4");
  modal.innerHTML = '';
  modal.classList.add('modal');
  const newModal = document.createElement('div');
  newModal.innerHTML = `

    <div class="modal-box max-w-5xl">
          <div class="flex gap-6 w-[80%] mx-auto py-20">
            <!-- right -->
            <div class="w-1/2 py-4 px-6 border-2 bg-red-50 border-red-400 rounded-xl space-y-4">
              <h3 class="text-xl font-semibold">
               ${description}
              </h3>
              <div class="flex gap-4 justify-center">
                <div
                  class="h-24 w-32 border flex items-center justify-center text-center bg-white rounded-lg"
                >
                  <p class="text-green-600 font-bold px-2">$10/month Basic</p>
                </div>
                <div
                  class="h-24 w-32 border flex items-center justify-center text-center bg-white rounded-lg"
                >
                  <p class="text-orange-600 font-bold px-2">$50/month Pro</p>
                </div>
                <div
                  class="h-24 w-32 border flex items-center justify-center text-center bg-white rounded-lg"
                >
                  <p class="text-red-600 font-bold px-2">Contact us Enterprise</p>
                </div>
              </div>
  
              <div class="flex justify-between">
                <div>
                  <h3 class="text-xl font-semibold">Features</h3>
                  <ul style="margin-left: 20px" class="list-disc ">
                   ${
                    featuresList.map(feature => `<li>${feature}.</li>`).join("")
                  }
                  </ul>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">Integrations</h3>
                  <ul class="list-disc pl-5 ">
                   ${
                    data.integrations?.map(item => `<li>${item}</li>`).join("")
                  }
                  </ul>
                </div>
              </div>
            </div>
  
            <!-- left -->
            <div class="w-1/2 p-4 border rounded-xl">
  
              <div class="object-cover mx-auto border-2 rounded-xl overflow-hidden">
                <img
                  src="${image_link[0]}"
                  alt=""
                  class="object-cover w-full h-full "
                />
              </div>
              <h1 class="text-center my-2 font-semibold text-xl" >Hi, how are you doing today?</h1>
              <p class="text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                accusantium 
              </p>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
  
  `

  modal.appendChild(newModal);

}

loadData();
