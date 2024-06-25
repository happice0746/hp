const a = 1;
Page({
  data: {
    a,
    b: 11,
  },
  methods: {
    handleClick() {
      console.log(this.data.a);
    },
  },
  onLaunch: () => {
    console.log("hello, world");
  },
});
