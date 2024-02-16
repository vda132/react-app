import { Button, Card, Checkbox } from "antd"
import { ImageGallery } from "../../features/swiper/image-gallery"
import { CommentOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"

export const Product = () => {
    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Card style={{ width: '50%' }}>
                <div>
                    <ImageGallery />
                </div>
                <div style={{ paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>Connection:</div>
                        <div>
                            <div>Wired</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>Size:</div>
                        <div>
                            <div>Medium</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>Features:</div>
                        <div>
                            <div>With backlight</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>OS compatibility:</div>
                        <div>
                            <div>Chrome OS</div>
                            <div>Linux</div>
                            <div>Mac OS</div>
                            <div>Microsoft Windows</div>
                        </div>
                    </div>
                </div>
            </Card>
            <div style={{ width: '50%' }}>
                <h1 style={{ marginTop: 'auto' }}>Gaming computer mouse XTRIKE ME GM-520 wired USB with RGB backlight |800-12800 6 step DPI, USB| Black</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div>Comment</div>
                    <div>Code: 415219812</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Card bordered={false} title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ padding: '10px 10px 10px 0px' }}>
                                <div>Seller: 5FOX</div>
                                <div><span>4.75/5</span></div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}><CommentOutlined /></div>
                        </div>
                    }>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '10px' }}>
                            <div>
                                <p style={{ margin: 'auto', textDecoration: 'line-through' }}>999 $</p>
                                <p style={{ margin: 'auto', color: 'red', fontSize: 'calc(4px * 7)' }}>749 $</p>
                                <p style={{ margin: 'auto', color: 'green' }}>Avaliable</p>
                            </div>
                            <div>
                                <Button style={{ backgroundColor: 'green', color: 'white' }}><ShoppingCartOutlined />Buy</Button>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Card>
                    <Card bordered={false}>
                        <Meta title="Additional services" description={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Checkbox>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                        <img
                                            src="https://content2.rozetka.com.ua/goods/images/big/393599756.png"
                                            style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: 'calc(4px * 2)' }} />
                                        Warranthy Services
                                    </div>
                                </Checkbox>
                                <Checkbox>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                        <img
                                            src="https://content1.rozetka.com.ua/goods/images/big/393600163.png"
                                            style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: 'calc(4px * 2)' }} />
                                        Service for non-warranty cases
                                    </div>
                                </Checkbox>
                                <Checkbox>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                        <img
                                            src="https://content2.rozetka.com.ua/goods/images/big/194954888.png"
                                            style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: 'calc(4px * 2)' }} />
                                        Remote PC setup for gamers
                                    </div>
                                </Checkbox>
                            </div>
                        } />
                    </Card>
                </div>
            </div>
        </div>
    )
}