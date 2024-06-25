const a = 1;
Page({
  data: {
    a,
    b: 11,
    flag: true,
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
