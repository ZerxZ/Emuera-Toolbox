routes.push({
  path: '/config-editor',
  component: {
    methods: {},
    mounted() { },
    render() {
      let content = []
      if (!this.$store.state.currentFile.ast) {
        if (this.$store.state.currentFile.content) {
          content = this.$store.state.currentFile.content.split('\n').map(line => {
            return Vue.h('div', {}, line)
          })
        }
      } else {
        this.$store.state.currentFile.ast.forEach(element => {
          if (element.type === 'Config') {
            content.push(Vue.h('div', {}, [
              Vue.h('span', {
                style: {
                  color: 'darkcyan'
                }
              }, element.name),
              Vue.h('span', {}, ' → '),
              Vue.h('span', {
                style: {
                  color: 'orange'
                }
              }, JSON.stringify(element.value))
            ]))
          } else {
            content.push(Vue.h('div', {}, [
              Vue.h('span', {
                style: {
                  color: '#fff'
                }
              }, JSON.stringify(element))
            ]))
          }
        })
      }
      return Vue.h('main', {
        class: 'editor'
      }, [
        Vue.h('div', {
          class: 'title-bar'
        }, [
          Vue.h('div', { class: 'title', onClick: () => { router.back() } }, 'Editor'),
          Vue.h('div', { innerHTML: '&emsp;' }),
          Vue.h('div', { class: 'file-name' }, this.$store.state.currentFile.name),
          Vue.h('div', { innerHTML: '&emsp;' }),
          Vue.h('div', { class: 'encoding' }, this.$store.state.currentFile.encoding),
          Vue.h('div', { class: 'spacer' })
        ]),
        Vue.h('div', {
          class: 'container',
          contenteditable: true
        }, content
        )
      ])
    }
  }
})
