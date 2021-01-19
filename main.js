let arbol = document.querySelector("#arbol")
let preO = document.querySelector("#preorder")
let postO = document.querySelector("#postorder")
let resultado = document.querySelector("#Resultado")
var exp = document.querySelector("#inp01")

class arbolito {
    constructor(numero) {
        this.numero = numero
        this.izquierdo = null
        this.derecho = null
        this.anterior = null
        this.siguente = null
    }

}

class funciones {
    constructor() {
        this.raiz = null
        this.preOrden = new Array()
        this.postOrden = new Array()
    }
    crearArbol(expresion) {
        /* CREACION DE LA LISTA DOBLE DE LA EXPRECION QUE ENTRO*/
        if (expresion != null) {
            for (let i = 0; i < expresion.length; i++) {
                let num = new arbolito(expresion.charAt(i))

                if (this.raiz === null) {
                    this.raiz = num
                } else {
                    let aux = this.raiz
                    while (aux.siguiente != null) {
                        aux = aux.siguiente
                    }
                    aux.siguiente = num
                    num.anterior = aux
                }
            }
            console.log('lista Doble')
            console.log(this.raiz)
            //---------------------------------------------------------------------------------------------------------------
            /*Creacion del arbol */
            let aux = this.raiz
            while (aux != null) {
                if (aux.numero === '^') {
                    aux = this.acomodarHojas(aux)
                }
                aux = aux.siguiente
            }
            if (this.raiz.siguiente != null || this.raiz.anterior != null) {
                aux = this.raiz
                while (aux != null) {
                    if (aux.numero === '*' || aux.numero === '/') {
                        aux = this.acomodarHojas(aux)
                    }
                    aux = aux.siguiente
                }
            }
            if (this.raiz.siguiente != null || this.raiz.anterior != null) {
                aux = this.raiz
                while (!aux) {
                    if (aux.numero === '+' || aux.numero === '-') {
                        aux = this.acomodarHojas(aux)
                    }
                    aux = aux.siguiente
                }
            }
            console.log('arbol binario')
            console.log(this.raiz)
        }
    }
    acomodarHojas(aux) {
        /*Le doy al operador sus respctivos hijos que serian los
        que estan a los lados */
        aux.izquierdo = aux.anterior
        aux.derecho = aux.siguiente
        /*En caso de que uno de los hijos sea la raiz cambio la 
        raiz al que esta en el siguiente que seria un nodo */
        if (aux.anterior.anterior === null) this.raiz = aux
        /**Cambio el siguiente del nodo por el valor al que esta 
         * conectado el valor que sigue por que ese al convertirse 
         * en un hijo dejaria de estar en nuestra lista a si que 
         * hacemos el cambio de conexiones
         */
        if (aux.siguiente != null) {
            aux.siguiente = aux.siguiente.siguiente
            if (aux.siguiente != null) aux.siguiente.anterior = aux
        }

        if (aux.anterior != null) {
            aux.anterior = aux.anterior.anterior
            if (aux.anterior != null) aux.anterior.siguiente = aux
        }
        /**Se realiza el corte del las variables para que dejend e estar
         * conectadas a la lista a ecepcion de la conexion que va al nodo
         * con el que tiene conexion
         */
        aux.izquierdo.anterior = null
        aux.derecho.siguiente = null

        if (aux.anterior === null && aux.siguiente == null) this.raiz = aux

        return aux
    }
    preorden() {
        if(this.raiz === null) this.crearArbol()
        
        let aux = this.raiz
        this.preOrden.push(aux.numero)
        
        while (aux.izquierdo!= null) {
            this.preOrden.push(aux.izquierdo.numero)
            aux = aux.izquierdo
        }
        while (aux != null) {
            if (aux.derecho != null) {
                this.preOrden.push(aux.derecho.numero)
                if (aux.derecho.izquierdo != null) {
                    aux = aux.derecho
                    while (aux.izquierdo != null) {
                        this.pre.push(aux.izquierdo.numero)
                        aux = aux.izquierdo
                    }
                }
            }
            if (aux.siguiente === null) {
                if (aux.anterior === null) aux = aux.anterior
                else aux = aux.anterior.siguiente
            }
            else if (aux.anterior === null) aux = aux.siguiente
        }
        let acomodo = ''
        for (let i = 0; i < this.preOrden.length; i++) {
            acomodo += String(this.preOrden[i])
        }
        exp.value = acomodo
    }
    postorden() {
        if(this.raiz === null) this.crearArbol()
        
        let aux = this.raiz
        while (aux.izquierdo != null) {
            aux = aux.izquierdo
        }
        while (aux != null) {
            if (aux.derecho != null) {
                if (aux.derecho.izquierdo != null) {
                    aux = aux.derecho
                    while (aux.izquierdo != null) {
                        aux = aux.izquierdo
                    }
                    this.postorden.push(aux.numero)
                } else {
                    this.postOrden.push(aux.derecho.numero)
                    this.postOrden.push(aux.numero)
                }
            } else {
                this.postOrden.push(aux.numero)
            }
            if (aux.siguiente === null) {
                if (aux.anterior === null) aux = aux.anterior
                else {
                    this.pre.push(aux.anterior.node)
                    aux = aux.anterior.siguiente

                }
            }
            else if (aux.anterior === null) aux = aux.siguiente
        }
        let acomodo = ''
        for (let i = 0; i < this.postOrden.length; i++) {
            acomodo += String(this.postOrden[i])
        }
        exp.value = acomodo
    }
    resultado() {
        this.crearArbol(exp.value)
        this.postorden()
        let i = 0
        while (this.postOrden.length != 1) {
            let x, y
            if (this.postOrden[i] === '*') {
                x = Number(this.postOrden[i - 2])
                y = Number(this.postOrden[i - 1])
                this.postOrden[i] = x * y
                while (i<this.postOrden.length) {
                    this.postOrden[i-2] = this.postOrden[i]
                    i++
                }
                this.postOrden.pop()
                this.postOrden.pop()
                i = 0
            } else if (this.postOrden[i] === '/') {
                x = Number(this.postOrden[i - 2])
                y = Number(this.postOrden[i - 1])
                this.postOrden[i] = x / y
                while (i<this.postOrden.length) {
                    this.postOrden[i-2] = this.postOrden[i]
                    i++
                }
                this.postOrden.pop()
                this.postOrden.pop()
    
                i = 0
            } else if (this.postOrden[i] === '+') {
                x = Number(this.postOrden[i - 2])
                y = Number(this.postOrden[i - 1])
                this.postOrden[i] = x + y
                while (i<this.postOrden.length) {
                    this.postOrden[i-2] = this.pre[i]
                    i++
                }
                this.postOrden.pop()
                this.postOrden.pop()
                
                i = 0
            } else if (this.postOrden[i] === '-') {
                x = Number(this.postOrden[i - 2])
                y = Number(this.postOrden[i - 1])
                this.postOrden[i] = x - y
                while (i<this.postOrden.length) {
                    this.postOrden[i-2] = this.postOrden[i]
                    i++
                }
                this.postOrden.pop()
                this.postOrden.pop()
                
                i = 0
            } else if (this.postOrden[i] === '^') {
                x = Number(this.postOrden[i - 2])
                y = Number(this.postOrden[i - 1])
                this.postOrden[i] = Math.pow(x, y)
                while (i<this.postOrden.length) {
                    this.postOrden[i-2] = this.pre[i]
                    i++
                }
                this.postOrden.pop()
                this.postOrden.pop()
                i = 0
            }
            i++
        }
        let acomodo = ''
        for (let i = 0; i < this.postOrden.length; i++) {
            acomodo += String(this.postOrden[i])
        }
        exp.value = acomodo
    }
}
var var1 = new funciones()
arbol.addEventListener('click', () => {
    var1.crearArbol(exp.value)
})

preO.addEventListener('click', () => {
    var1.preorden()
})

postO.addEventListener('click', () => {
    var1.postorden()
})

resultado.addEventListener('click', () => {
    var1.resultado()
})
