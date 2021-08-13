const app = Vue.createApp({
    data() {
      return {
        array: [],
        size: 10, 
        barWidth : 50,
        sleepTime : 100,
        barColor : '#666666',
        currentALgorithm : '',
        currentIndex : -1,
        divs : [],
        algorithmFunc : {
          'bubbleSort' : this.bubbleSort,
        },
      };
    },

    methods: {
      setSize(){
          let n = document.getElementById("arraySize").value;
          this.size = parseInt(n);
          console.log('setSize - size : '+this.size);
          this.barWidth = 500/this.size;
          console.log('barWidth : '+this.barWidth);
      },

      speed(){
        this.sleepTime = 100 / document.getElementById("sortSpeed").value;
      },

      sleep() {
        return new Promise((resolve) => setTimeout(resolve, this.sleepTime));
      },

      swapDivs(x, y){
        console.log(x+' - '+y);
        let temp = this.divs[x].style.height;
        this.divs[x].style.height = this.divs[y].style.height;
        this.divs[y].style.height = temp;
      },

      generateArray() {
        // populate array with random numbers between 5 and 750
        //this.divs.remove();
        console.log('size : '+this.size);
        let arrDiv = document.getElementById("array-bars");
        arrDiv.innerHTML = '';

        let limit = this.size;
        this.array = [];
        for (let i = 0; i < limit; i++) {
          let number = this.getRndInteger(5, 1000);
          this.array.push(number);
          arrDiv.style = "flex-direction : row";
          this.divs[i] = document.createElement("div");
          arrDiv.appendChild(this.divs[i]);
          this.divs[i].style = "height:"+ (number/1.8) + "px; width : "+this.barWidth +"px; background-color : gray; display: inline-block; margin-left: 1px; margin-top: 25px;";
        }

        this.barWidth = 550 / this.size;
        //console.log('width : '+this.barWidth);
        console.log(...this.array);
        this.sleep();
      },

      getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      changeDivColor(index, myColor){
        this.divs[index].style.backgroundColor = myColor;
      },

      async bubbleSort() {
        this.currentALgorithm = 'bubbleSort';
    
        let len = this.array.length;
        let swapped = false;
        let x = 1;
        do{
          swapped = false;
          for (let i = 0; i < len; i++) {
            this.currentIndex = i;
              
            if (this.array[i] > this.array[i + 1]) {
              this.changeDivColor(i, 'red');
              this.changeDivColor(i+1, 'red');

              swapped = true;
              let temp = this.array[i];
              this.array[i] = this.array[i + 1];
              this.array[i + 1] = temp;
            
              let divTemp2 = this.divs[i].style.height;
              this.divs[i].style.height = this.divs[i+1].style.height;
              this.divs[i+1].style.height = divTemp2;

              // sleep - to visualize / see the changes
              await this.sleep();
              
              this.changeDivColor(i, 'gray');
              this.changeDivColor(i+1, 'gray');
            }
            
          }
          this.divs[this.size-x++].style.backgroundColor = 'green';
          
        }while(swapped);

        this.divs.forEach((curDiv) => {
          curDiv.style.backgroundColor = 'green';
        });

        console.log(...this.array);
      },

      async selectionSort() {
        this.currentALgorithm = 'selectionSort';
        let min,i,len = this.size;
        let index,array = this.array;
        for(i=0; i<len-1; i++){
          min = array[i];
          index = i;
          for(let j=i+1; j<len; j++){
            this.changeDivColor(i, 'red');
            this.changeDivColor(j, 'red');
            if(array[j] <= min){
              min = array[j];
              index = j;
            }

            await this.sleep();
            this.changeDivColor(i, 'gray');
            this.changeDivColor(j, 'gray');
          }

          let temp = array[i];
          array[i] = array[index];
          array[index] = temp;

          let divTemp = this.divs[i].style.height;
          if(this.divs[i]) this.divs[i].style.height = this.divs[index].style.height;
          if(this.divs[index]) this.divs[index].style.height = divTemp;

          this.changeDivColor(i, 'green');
          console.log(...this.array);
        }
        this.changeDivColor(i, 'green');
        console.log(...this.array);
      },

      async insertionSort() {
        let array = this.array, len = this.size;
        for(let i=1; i<len; i++){
          this.changeDivColor(i, 'red');
          let j = i-1, curNum = array[i];
          let curNumHeight = this.divs[i].style.height;
          while(j>=0 && array[j]>curNum) {
            array[j+1] = array[j];
            this.divs[j+1].style.height = this.divs[j].style.height;
            this.changeDivColor(j, 'black');
            await this.sleep();
            this.changeDivColor(j, 'gray');
            j--;
          }

          array[j+1] = curNum;
          this.divs[j+1].style.height = curNumHeight;

          this.changeDivColor(i, 'gray');
          this.changeDivColor(j+1, 'green');
        }

        console.log(...array);

        this.divs.forEach((curDiv) => {
          curDiv.style.backgroundColor = 'green';
        });
        
      },

      async merge(start, mid, end) {
        let size1 = mid-start+1, size2 = end-mid;
        let temp1=[], temp2=[];
        let i=0, j=0, k=start;

        //for(let x=start; x<=end; x++){
        //  this.divs[x].style.backgroundColor = 'red';
        //}

        for(let p=0; p<size1; p++) temp1[p] = this.array[start+p];
        for(let q=0; q<size2; q++) temp2[q] = this.array[mid+q+1];

        while(i<size1 && j<size2) {
          if(temp1[i] <= temp2[j]){
            this.array[k] = temp1[i];
            this.divs[k].style.height = temp1[i]/1.8+'px';
            k++; i++;
          }
          else{
            this.array[k] = temp2[j];
            this.divs[k].style.height = temp2[j]/1.8+'px';
            k++; j++;
          }
        }

        while(i<size1) {
          this.array[k] = temp1[i];
          this.divs[k].style.height = temp1[i]/1.8+'px';
          k++; i++;
        }

        while(j<size2){
          this.array[k] = temp2[j];
          this.divs[k].style.height = temp2[j]/1.8+'px';
          k++; j++;
        }

        await this.sleep();
        //for(let x=start; x<=end; x++){
        //  this.divs[x].style.backgroundColor = 'green';
        //}
        console.log(...this.array);
      },

      async mergeSort(start, end) {
        if(start<end){
          let mid = Math.floor((end+start)/2);
          await this.mergeSort(start, mid);
          await this.mergeSort(mid+1, end);
          await this.merge(start, mid, end);
        }
      },

      async ms() {
        //console.log(...this.array);
        await this.mergeSort(0, this.size-1);

        await this.divs.forEach((curDiv) => {
          console.log(curDiv.style.height);
        });
      },

      
      async partition(start, end){
        let i=start-1, arr = this.array;
        let pivot = arr[end], j;
        
        this.divs[end].style.backgroundColor = 'red';
        await this.sleep();

        for(j = start; j<=end-1 ; j++){
          if(arr[j] < pivot){
            i++;
            console.log('i : '+i);
            this.swapDivs(i , j);
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
          }
        }

        let temp2 = arr[i+1];
        arr[i+1] = arr[end];
        arr[end] = temp2;

        
        this.swapDivs(i+1 , j);
        this.divs[i+1].style.backgroundColor = 'green';
        this.divs[end].style.backgroundColor = 'gray';
        await this.sleep();
        this.divs[i+1].style.backgroundColor = 'gray';
        return i+1;
      },

      async quickSort(start, end){
        if(start<end){
          let newPivotIndex = await this.partition(start, end);

          await this.quickSort(start, newPivotIndex-1);
          await this.quickSort(newPivotIndex+1, end);
        }
      },

      async qs(){
        await this.quickSort(0, this.size-1);

        console.log(...this.array);
      }
    },

    mounted() {
      this.generateArray();
    }

  });
  
app.mount("#app");

/*

merging(arr,start, mid, end) {
  let size1 = parseInt(mid-start+1);
  let size2 = parseInt(end-mid);
  console.log('sizes : '+size1+' _ '+size2)
  let temp1 = new Array(size1);
  let temp2 = new Array(size2);
  let i=0, j=0, k=start;

  for(let p=0; p<size1; p++) temp1[p] = arr[start+p];
  for(let q=0; q<size2; q++) temp2[q] = arr[mid+q+1];

  while(i<size1 && j<size2) {
    if(temp1[i] <= temp2[j])
      arr[k++] = temp1[i++];
    else
      arr[k++] = temp2[j++];
  }

  while(i<size1) 
    arr[k++] = temp1[i++];
  while(j<size2)
    arr[k++] = temp2[j++]

},

mSort(arr, start, end) {
  if(start<end){
    let mid = Math.floor((end+start)/2);
    this.mSort(arr, start, mid);
    this.mSort(arr, mid+1, end);
    this.merging(arr,start, mid, end);
  }
},

*/