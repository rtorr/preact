import{ATTR_KEY}from'../constants.js';import{isSameNodeType,isNamedNode}from'./index.js';import{buildComponentFromVNode}from'./component.js';import{createNode,setAccessor}from'../dom/index.js';import{unmountComponent}from'./component.js';import options from'../options.js';import{removeNode}from'../dom/index.js';export const mounts=[];export let diffLevel=0;let isSvgMode=!1,hydrating=!1;export function flushMounts(){for(let a;a=mounts.pop();)options.afterMount&&options.afterMount(a),a.componentDidMount&&a.componentDidMount()}export function diff(a,b,d,e,f,g){diffLevel++||(isSvgMode=null!=f&&void 0!==f.ownerSVGElement,hydrating=null!=a&&!(ATTR_KEY in a));let h=idiff(a,b,d,e,g);return f&&h.parentNode!==f&&f.appendChild(h),--diffLevel||(hydrating=!1,!g&&flushMounts()),h}function idiff(a,b,d,e,f){let g=a,h=isSvgMode;if((null==b||!1===b||!0===b)&&(b=''),'string'==typeof b||'number'==typeof b)return a&&void 0!==a.splitText&&a.parentNode&&(!a._component||f)?a.nodeValue!=b&&(a.nodeValue=b):(g=document.createTextNode(b),a&&(a.parentNode&&a.parentNode.replaceChild(g,a),recollectNodeTree(a,!0))),g[ATTR_KEY]=!0,g;if('function'==typeof b.nodeName)return buildComponentFromVNode(a,b,d,e);if(isSvgMode='svg'===b.nodeName||'foreignObject'!==b.nodeName&&isSvgMode,(!a||!isNamedNode(a,b.nodeName+''))&&(g=createNode(b.nodeName+'',isSvgMode),a)){for(;a.firstChild;)g.appendChild(a.firstChild);a.parentNode&&a.parentNode.replaceChild(g,a),recollectNodeTree(a,!0)}let k=g.firstChild,l=g[ATTR_KEY]||(g[ATTR_KEY]={}),m=b.children;return!hydrating&&m&&1===m.length&&'string'==typeof m[0]&&null!=k&&void 0!==k.splitText&&null==k.nextSibling?k.nodeValue!=m[0]&&(k.nodeValue=m[0]):(m&&m.length||null!=k)&&innerDiffNode(g,m,d,e,hydrating||null!=l.dangerouslySetInnerHTML),diffAttributes(g,b.attributes,l),isSvgMode=h,g}function innerDiffNode(a,b,d,e,f){let q,r,s,t,g=a.childNodes,h=[],k={},l=0,m=0,n=g.length,o=0,p=b?b.length:0;if(0!==n)for(let u=0;u<n;u++){let v=g[u],w=v[ATTR_KEY],x=p&&w?v._component?v._component.__key:w.key:null;null==x?(w||(void 0===v.splitText?f:!f||v.nodeValue.trim()))&&(h[o++]=v):(l++,k[x]=v)}if(0!==p)for(let u=0;u<p;u++){s=b[u],t=null;let v=s.key;if(null!=v)l&&void 0!==k[v]&&(t=k[v],k[v]=void 0,l--);else if(!t&&m<o)for(q=m;q<o;q++)if(void 0!==h[q]&&isSameNodeType(r=h[q],s,f)){t=r,h[q]=void 0,q===o-1&&o--,q===m&&m++;break}t=idiff(t,s,d,e),t&&t!==a&&(u>=n?a.appendChild(t):t!==g[u]&&(t===g[u+1]?removeNode(g[u]):a.insertBefore(t,g[u]||null)))}if(l)for(let u in k)void 0!==k[u]&&recollectNodeTree(k[u],!1);for(;m<=o;)void 0!==(t=h[o--])&&recollectNodeTree(t,!1)}export function recollectNodeTree(a,b){let d=a._component;d?unmountComponent(d):(null!=a[ATTR_KEY]&&a[ATTR_KEY].ref&&a[ATTR_KEY].ref(null),(!1===b||null==a[ATTR_KEY])&&removeNode(a),removeChildren(a))}export function removeChildren(a){for(a=a.lastChild;a;){let b=a.previousSibling;recollectNodeTree(a,!0),a=b}}function diffAttributes(a,b,d){for(var e in d)b&&null!=b[e]||null==d[e]||setAccessor(a,e,d[e],d[e]=void 0,isSvgMode);for(e in b)'children'===e||'innerHTML'===e||e in d&&b[e]===('value'===e||'checked'===e?a[e]:d[e])||setAccessor(a,e,d[e],d[e]=b[e],isSvgMode)}