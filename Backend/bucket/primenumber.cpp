#include<iostream>

using namespace std;

int main(){
    int n;cin>>n;
    int *pn = new int;
    int size=0;
    for(int i=0; i<=n ;i++){
        bool isPrime = true;
        for (int j = 2; j < i; j++)
        {
            if(i%j == 0){
                isPrime = false;
            }
            
            
        }
        if (isPrime==true)
            {
                pn[size] = i;
                size++;
                cout<<i<<'\t';
            }
        
    
    }
    cout<<endl<<"The number of prime number between 0 and "<<n<< " are "<<size<<endl;
    delete pn;

    return 0;
}