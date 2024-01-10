'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { BsFlag, BsTicket } from 'react-icons/bs'
import { FaCartPlus } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import VisitLocationSlide from './visit-location-slide'
import ScheduleTour from './schedule-tour'
import DetailTourInner from './detail-tour-inner'
import NoteCollapsible from './note-collapsible'
import CardVertical from '@/components/CardVertical/card-vertical'
import { useParams } from 'next/navigation'
import useFetchProductDetail from '@/queries/products/useFetchProductDetail'
import { IProduct } from '@/types/Product'
import calculateDiscountedPrice from '@/helpers/discount'
import convertNumToVND from '@/helpers/convertNumToVND'
import moment from 'moment'
import { convertDateDDMMYYYYhhmm } from '@/helpers/convertDateDDMMYYYYhhmm'
import { DATE_FORMAT } from '@/constants'
import { IoIosTime } from 'react-icons/io'
import { FaMap } from 'react-icons/fa'
import { FaCarSide, FaHotel } from 'react-icons/fa6'
import { IoFastFood } from 'react-icons/io5'
import { MdAvTimer } from 'react-icons/md'
import { MdFamilyRestroom } from 'react-icons/md'
import { CiDiscount1 } from 'react-icons/ci'
import { useRouter } from 'next/navigation'

const NOTE_INFO = [
  {
    title: 'Giá tour bao gồm',
    description:
      '- Xe tham quan (16, 29, 35, 45 tùy theo số lượng khách) theo chương trình - Khách sạn theo tiêu chuẩn 2 khách/phòng hoặc 3 khách/phòng + Tương đương 3 sao: Mai Vàng, Mai Thắng, Queen TT, Daisy Gold… hoặc tương đương + Tương đương 4 sao: Mường Thanh, Sammy, TTC Ngọc Lan … hoặc tương đương - Vé tham quan theo chương trình. - Các bữa ăn chính theo chương trình tiêu chuẩn từ 110.000 ~130.000vnđ/bữa - Hướng dẫn viên tiếng Việt suốt tuyến - Bảo hiểm du lịch với mức bồi thường cao nhất 120.000.000đ/vụ - Nón Vietravel + Nước suối + Khăn lạnh - Thuế VAT'
  },
  {
    title: 'Giá tour không bao gồm',
    description:
      '- Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, phụ thu phòng đơn … - Chi phí tham quan ngoài chương trình.'
  },
  {
    title: 'Giá vé trẻ em',
    description:
      '- Chi phí cá nhân: ăn uống ngoài chương trình, giặt ủi, phụ thu phòng đơn … - Chi phí tham quan ngoài chương trình.'
  },
  {
    title: 'Điều kiện thanh toán',
    description: 'Khi đăng ký và thành toán 100% tiền tour'
  },
  {
    title: 'Các điều kiện khi đăng ký tour',
    description:
      '- Khi đăng ký tour Quý khách vui lòng mang theo CMND/Passport bản chính hoặc cung cấp tên chính xác đầy đủ, đúng từng ký tự trên CMND/ Passport (Hộ chiếu)/Giấy khai sinh (trẻ em dưới 14 tuổi) theo thứ tự: Họ/tên lót/tên. - Qui định giấy tờ tùy thân khi đi tour: Đối với Khách Quốc tịch Việt Nam: Khi đi tour Trẻ em từ 14 tuổi trở lên và người lớn cần đem theo CMND/Passport (Hộ chiếu) bản chính còn hạn sử dụng, hình ảnh rõ (CMND có thời hạn sử dụng không quá 15 năm, tính từ ngày cấp)/ Giấy khai sinh bản chính (trẻ em dưới 14 tuổi), trẻ em trên 14 tuổi bắt buộc phải có CMND hoặc Passport làm thủ tục lên máy bay. Đối với khách Nước ngoài/Việt Kiều: Khi đi tour phải mang theo đầy đủ Passport (Hộ Chiếu) bản chính còn hạn sử dụng hoặc thẻ xanh kèm theo Visa và giấy tái xuất nhập Việt Nam. - Giờ nhận phòng & trả phòng theo qui định khách sạn, nhận sau 14:00 giờ và trả trước 12:00 giờ. - Phòng khách sạn/resort có thể xảy ra trường hợp phòng không gần nhau, không cùng tầng, loại phòng một giường đôi hoặc hai giường đơn không theo yêu cầu, tùy tình hình thực tế từng khách sạn/Resort. - Đối với các tour sử dụng dịch vụ khách sạn/Resort tiêu chuẩn 5 sao: Khách quốc tịch Việt Nam ở chung phòng khách nước ngoài, yêu cầu phải có hôn thú - Trường hợp quý khách tham gia tour 01 khách, bắt buộc đóng thêm tiền phụ thu phòng đơn để ở riêng 01 phòng. Trường hợp trong đoàn cũng có khách đi 01 mình, cùng giới tính và có nhu cầu muốn ghép cùng phòng với quý khách thì Vietravel sẽ hoàn lại tiền phụ thu phòng đơn cho quý khách. - Trường hợp quý khách đi nhóm 03 khách, Vietravel sẽ cung cấp 01 phòng dành cho 03 khách là 01 giường lớn 1m6 và 01 giường phụ di động từ 0.8 - 1,2m (extrabed) hoặc 01 nệm đơn tùy từng khách sạn/Resort. Trong trường quý khách có nhu cầu ở riêng, vui lòng đóng thêm tiền phụ thu phòng đơn theo qui định - Thông tin tập trung: Tại trụ sở chính Vietravel - 190 Pasteur, Phường 6, Quận 3, Tp HCM trước giờ khởi hành 15-30 phút. Trong trường hợp Quý khách đến trễ vui lòng tự túc chi phí ghép đoàn - Quý khách dưới 18 tuổi khi đi tour phải có Bố Mẹ hoặc người thân trên 18 tuổi đi cùng. Trường hợp đi một mình phải được Bố Mẹ ủy quyền (có xác nhận của chính quyền địa phương) cho Vietravel - Vì lý do sức khỏe, sự an toàn cũng như để đảm bảo Quý khách tham gia tour có những trải nghiệm tuyệt vời nhất, Quý khách cần phải có đủ sức khỏe tham gia tour của chúng tôi. - Khách nữ từ 55 tuổi trở lên và khách nam từ 60 trở lên: nên có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Riêng khách từ 70 tuổi trở lên: Bắt buộc phải có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng. Hạn chế không nhận khách từ 80 tuổi trở lên. Khách từ 80 tuổi không có chế độ bảo hiểm. - Quý khách mang thai vui lòng báo cho nhân viên bán tour ngay tại thời điểm đăng ký. Phải có ý kiến của bác sĩ trước khi đi tour, tự chịu trách nhiệm về sức khỏe của mình và thai nhi trong suốt thời gian tham gia chương trình du lịch. Khi đi tour phải mang theo sổ khám thai và giấy tờ tùy thân theo - Quy định hãng hàng không. Tuần thai từ 28 tuần trở đi phải mang theo giấy khám thai trong vòng 7 ngày trở lại. - Cam kết bản thân và người thân hoàn toàn có đủ sức khỏe để đi du lịch theo chương trình. Đồng ý miễn trừ toàn bộ trách nhiệm pháp lý; không khiếu nại; không yêu cầu bồi thường đối với Vietravel nói chung và nhân viên Vietravel nói riêng về tất cả các vấn đề xảy ra liên quan đến tình trạng sức khỏe của khách hàng khi tham gia tour hoặc sử dụng các dịch vụ do Vietravel cung cấp. Khách hàng cam kết tự chịu mọi chi phí phát sinh ngoài chương trình tour liên quan đến việc giải quyết các rủi ro về sức khỏe (lưu trú, vận chuyển, chi phí khám chữa bệnh...) – ngoại trừ các chi phí thuộc hạng mục bảo hiểm sẽ do Công ty Bảo hiểm hoàn trả theo quy định. - Đối với các chương trình tham quan có biển đảo: trong trường hợp Quý khách không khỏe, có tiền sử bệnh hoặc có chất kích thích trong người (rượu, bia…) thì không nên tắm & lặn biển để đảm bảo sự an toàn tuyệt đối. Trong trường hợp Quý khách xảy ra sự cố ngoài ý muốn thì Vietravel sẽ không chịu trách nhiệm do lỗi có tình vi phạm. - Quý khách có nhu cầu cần xuất hóa đơn vui lòng cung cấp thông tin xuất hóa đơn cho nhân viên bán tour khi ngay khi đăng ký, không nhận xuất hóa đơn sau khi tour đã kết thúc. - Quý khách vui lòng tham khảo kỹ các Điều Kiện Bán Vé trước khi đăng ký chuyến du lịch. Trong trường hợp không trực tiếp đăng ký, nhờ người thân đăng ký hộ vui lòng cập nhật thông tin từ người đăng ký. - Đây là chương trình du lịch trọn gói, Vietravel không có trách nhiệm hoàn trả chi phí chênh lệch cho các khách hàng thuộc diện miễn giảm hoặc đối tượng ưu tiên như trẻ nhỏ, người lớn tuổi, người có công với cách mạng… Chính sách miễn giảm, ưu tiên (nếu có) chỉ dành cho khách lẻ của các điểm tham quan.'
  },
  {
    title: 'Lưu ý khi chuyển/hủy tour',
    description:
      '- Tour không hoàn, không đổi, không dời, hủy tour chi phí hủy 100%'
  },
  {
    title: 'Các điều kiện hủy tour đối với ngày thường',
    description:
      '- Tour không hoàn, không đổi, không dời, hủy tour chi phí hủy 100%'
  },
  {
    title: 'Các điều kiện hủy tour đối với ngày lễ, Tết',
    description:
      'Áp dụng cho các tour có thời gian diễn ra rơi vào một trong các ngày Lễ, Tết theo qui định - Tour không hoàn, không đổi, không dời, hủy tour chi phí hủy 100%'
  },
  {
    title: 'Trường hợp bất khả kháng',
    description:
      'Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì một lý do bất khả kháng như hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, dịch bệnh, hoãn, dời, hủy chuyến hoặc thay đổi khác của các phương tiện vận chuyển công cộng hoặc các sự kiện bất khả kháng khác theo quy định pháp luật …), thì Vietravel sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên, mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng. Việc hoàn tiền dịch vụ trong trường hợp hủy tour do sự kiện bất khả kháng sẽ tùy thuộc vào quy định và điều kiện của các đối tác cung ứng dịch vụ, thời gian hoàn tiền (nếu có ) từ 60 - 90 ngày'
  },
  {
    title: 'Thông tin visa',
    description: ''
  },
  {
    title: 'Liên hệ',
    description: 'Trần Hoàng Phúc'
  }
]

export default function TourDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { data }: any = useFetchProductDetail(params?.id.toString())
  const product: IProduct | undefined = data?.product
  return (
    <div className={cn('min-h-screen ')}>
      <section className={cn('bg-[#f9f9f9]')}>
        <div className={cn('w-[85%] m-auto py-10')}>
          <div
            className={cn(
              'flex items-center gap-2 text-hover-color text-xs mb-2'
            )}
          >
            <BsTicket size={15} />
            <span>{product?._id}</span>
          </div>
          <div className={cn('flex mb-10 justify-between')}>
            <div>
              <h4 className={cn('text-2xl font-bold text-primary-color w-1/2')}>
                {product?.title}
              </h4>
              <div className={cn('flex gap-2 items-center')}>
                <p
                  className={cn(
                    'bg-[#fdc432] text-xl font-bold w-fit px-4 py-3 text-white rounded-sm relative flex items-center justify-end',
                    'before:absolute before:bottom-[-8px] before:right-0 before:z-50 before:h-0 before:w-0  before:border-l-[12px] before:border-l-transparent before:border-t-[12px] before:border-t-[#fdc432]'
                  )}
                >
                  {product?.averagedStars}
                </p>
                <div className={cn('text-primary-color text-sm')}>
                  <p>Tuyệt vời</p>
                  <p>385 quan tâm</p>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-primary-color bg-white border border-[#d9d9d9] px-6 rounded-sm py-2'
                  )}
                >
                  <FaHeart size={25} className={cn('text-red-color')} />
                  126
                </div>
              </div>
            </div>

            <div className={cn('w-1/2 flex justify-end gap-2')}>
              <div>
                <p className={cn('text-xs')}>
                  Giá{' '}
                  <span
                    className={cn(
                      'relative',
                      'before:absolute before:top-1/2 before:w-full before:h-[1px] before: before:bg-primary-color'
                    )}
                  >
                    {convertNumToVND(product?.price?.audult || 0)}
                  </span>
                  ₫/ khách
                </p>
                <div className={cn('flex gap-2 items-center')}>
                  <span
                    className={cn(
                      'bg-red-color text-white text-xs font-semibold p-1 rounded-sm tracking-wider'
                    )}
                  >
                    {product?.sale}% GIẢM
                  </span>
                  <span className={cn('text-xl text-red-color font-bold')}>
                    {convertNumToVND(
                      calculateDiscountedPrice(
                        product?.price?.audult || 0,
                        product?.sale || 0
                      )
                    )}
                  </span>
                </div>
              </div>
              <div className={cn('flex flex-col gap-2')}>
                <Button
                  className={cn(
                    'gap-2 px-14 py-6 bg-gradient-to-r from-red-400 to-red-600 '
                  )}
                  onClick={() => router.push(`/tour-booking/${product?._id}`)}
                >
                  <FaCartPlus /> Đặt ngay
                </Button>
                <Button
                  className={cn(
                    'bg-transparent hover:bg-transparent text-primary-color border border-primary-color py-6 px-14'
                  )}
                >
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          </div>
          <div className={cn('grid grid-cols-12 min-h-[535px] gap-4 mb-10')}>
            <div
              className={cn('relative col-span-7 rounded-xl overflow-hidden')}
            >
              <Image
                layout='fill'
                src={product?.urls?.[0]?.url || ''}
                alt='Image'
              />
            </div>
            <div className={cn('col-span-5 h-full grid grid-cols-1 gap-4')}>
              <div className={cn('grid grid-cols-2 gap-4 col-span-1')}>
                <div className={cn('relative rounded-xl overflow-hidden')}>
                  <Image
                    objectFit='cover'
                    layout='fill'
                    alt='Image'
                    src={product?.urls?.[1]?.url || ''}
                  />
                </div>
                <div className={cn('relative rounded-xl overflow-hidden')}>
                  <Image
                    objectFit='cover'
                    layout='fill'
                    alt='Image'
                    src={product?.urls?.[2]?.url || ''}
                  />
                </div>
              </div>
              <div
                className={cn('h-full grid grid-cols-1 col-span-1 relative')}
              >
                <Image
                  className={cn('rounded-xl')}
                  objectFit='cover'
                  layout='fill'
                  src={product?.urls?.[3]?.url || ''}
                  alt='Image'
                />
              </div>
            </div>
          </div>
          <div className={cn('grid grid-cols-10 gap-4 mb-10')}>
            <div className={cn('col-span-4')}>
              <div
                className={cn(
                  'text-primary-color max-h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#ccc] mt-4 scrollbar-track-gray-100'
                )}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description || ''
                  }}
                />
              </div>
              <div
                className={cn(
                  'bg-white px-6 py-3 rounded-xl mt-4 grid grid-cols-3'
                )}
              >
                <div className={cn('col-span-2')}>
                  <p>
                    Khởi hành{' '}
                    <span className={cn('text-primary-color font-bold')}>
                      {convertDateDDMMYYYYhhmm(
                        product?.tripInfo?.departAt || ''
                      )}
                    </span>
                  </p>
                  <p>
                    Tập trung{' '}
                    <span className={cn('text-primary-color font-bold')}>
                      {convertDateDDMMYYYYhhmm(
                        product?.tripInfo?.focusAt || ''
                      )}
                    </span>
                  </p>
                  <p>
                    Thời gian{' '}
                    <span className={cn('text-primary-color font-bold')}>
                      {moment(product?.endDate, DATE_FORMAT.dateDDMMYYYY).diff(
                        moment(product?.startDate, DATE_FORMAT.dateDDMMYYYY),
                        'days'
                      )}{' '}
                      ngày
                    </span>
                  </p>
                  <p>
                    Nơi khởi hành{' '}
                    <span className={cn('text-primary-color font-bold')}>
                      {product?.tripInfo?.startingGate?.name}
                    </span>
                  </p>
                  <p>
                    Số chỗ{' '}
                    <span className={cn('text-primary-color font-bold')}>
                      {product?.numberOfSeatsLeft}
                    </span>
                  </p>
                </div>
                <div className={cn('col-span-1 flex justify-end')}>
                  <Button
                    className={cn(
                      'flex gap-1 bg-transparents text-primary-color border-hover-color border py-0 px-2',
                      'hover:bg-transparent'
                    )}
                  >
                    <MdDateRange className={cn('text-hover-color')} size={16} />
                    Ngày khác
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={cn(
                'col-span-6 grid grid-cols-4 p-4 border-b border-b-primary-color'
              )}
            >
              <div className={cn('flex flex-col text-primary-color')}>
                <IoIosTime size={30} />
                <p className={cn('font-bold')}>Thời gian</p>
                <p className={cn('text-xs mt-2')}>
                  {' '}
                  {moment(product?.endDate, DATE_FORMAT.dateDDMMYYYY).diff(
                    moment(product?.startDate, DATE_FORMAT.dateDDMMYYYY),
                    'days'
                  )}{' '}
                  ngày
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <FaCarSide size={30} />
                <p className={cn('font-bold')}>Phương tiện di chuyển</p>
                <p className={cn('text-xs mt-2')}>
                  {product?.tripInfo?.modesOfTransportation?.join(', ')}
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <FaMap size={30} />
                <p className={cn('font-bold')}>Điểm tham quan</p>
                <p className={cn('text-xs mt-2')}>
                  {product?.schedule
                    ?.map((s) => s.location.locationName)
                    .join(', ')}
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <IoFastFood size={30} />
                <p className={cn('font-bold')}>Ẩm thực</p>
                <p className={cn('text-xs mt-2')}>
                  {product?.tripInfo?.cuisine}
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <MdAvTimer size={30} />
                <p className={cn('font-bold')}>Thời gian lý tưởng</p>
                <p className={cn('text-xs mt-2')}>
                  {product?.tripInfo?.idealTime}
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <MdFamilyRestroom size={30} />
                <p className={cn('font-bold')}>Đối tượng thích hợp</p>
                <p className={cn('text-xs mt-2')}>
                  {product?.tripInfo?.suitableObject?.join(', ')}
                </p>
              </div>
              <div className={cn('flex flex-col text-primary-color')}>
                <CiDiscount1 size={30} />
                <p className={cn('font-bold')}>Ưu tiên</p>
                <p className={cn('text-xs mt-2')}>Đã bao gồm trong giá tour</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={cn('')}>
        <div className={cn('w-[85%] m-auto')}>
          <h4
            className={cn(
              'text-center text-2xl font-bold text-primary-color mb-4 mt-10'
            )}
          >
            Những địa điểm tham quan
          </h4>
          <VisitLocationSlide schedule={product?.schedule || []} />
        </div>
      </section>
      <section>
        <h4
          className={cn(
            'text-center text-2xl font-bold text-primary-color mb-4 mt-10'
          )}
        >
          Lịch trình
        </h4>
        <ScheduleTour schedule={product?.schedule || []} />
      </section>
      <section>
        <div className={cn('grid grid-cols-12 w-[85%] m-auto mt-10 gap-8')}>
          <div className={cn('col-span-6')}>
            <h2 className={cn('text-primary-color font-bold text-xl')}>
              Chi tiết tour
            </h2>
            <div className={cn('bg-[#f9f9f9] p-6 rounded-xl mt-8')}>
              <div className={cn('border-b border-b-[#ced4de] pb-10')}>
                <h3 className={cn('text-primary-color font-bold text-base')}>
                  Thông tin hãng Xe
                </h3>
                <div
                  className={cn(
                    'grid grid-cols-2 relative gap-8',
                    'before:absolute before:top-0 before:left-1/2 before:h-full before:border-r before:border-r-[#ced4de]'
                  )}
                >
                  <div className={cn('col-span-1')}>
                    <DetailTourInner />
                  </div>
                  <div className={cn('col-span-1')}>
                    <DetailTourInner />
                  </div>
                </div>
              </div>
              <div className={cn('mt-6')}>
                <h3
                  className={cn('text-primary-color font-bold text-base mb-6')}
                >
                  Thông tin tập trung
                </h3>
                <div className={cn('grid grid-cols-2 text-sm mb-6 ')}>
                  <p className={cn('col-span-1')}>Ngày giờ tập trung</p>
                  <div className={cn('col-span-1')}>
                    <p>
                      {convertDateDDMMYYYYhhmm(
                        product?.tripInfo?.focusAt || ''
                      )}
                    </p>
                  </div>
                </div>
                <div className={cn('grid grid-cols-2 text-sm')}>
                  <p className={cn('col-span-1')}>Nơi tập trung</p>
                  <div className={cn('col-span-1')}>
                    <p>{product?.tripInfo?.startingGate?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn('col-span-6')}>
            <h2 className={cn('text-primary-color font-bold text-xl')}>
              Giá tour & phụ thu phòng đơn
            </h2>
            <div className={cn('mt-8')}>
              <div className={cn(' pb-10 bg-[#f9f9f9] p-6 rounded-xl')}>
                <table className={cn('w-full table-fixed')}>
                  <tbody className={cn('text-left space-y-10')}>
                    <tr className={cn('text-primary-color font-bold')}>
                      <th colSpan={2}>Loại khách</th>
                      <th>Giá tour</th>
                    </tr>
                    <tr className={cn('text-sm text-primary-color')}>
                      <td colSpan={2} className={cn('font-normal')}>
                        Người lớn (Từ 12 tuổi trở lên)
                      </td>
                      <td className={cn('font-normal text-red-color')}>
                        {convertNumToVND(product?.price?.audult || 0)}
                      </td>
                    </tr>
                    <tr className={cn('text-sm text-primary-color')}>
                      <td colSpan={2} className={cn('font-normal')}>
                        Trẻ em (Từ 5 đến 11 tuổi)
                      </td>
                      <td className={cn('font-normal text-red-color')}>
                        {convertNumToVND(product?.price?.child || 0)}
                      </td>
                    </tr>
                    <tr className={cn('text-sm text-primary-color')}>
                      <td colSpan={2} className={cn('font-normal')}>
                        Trẻ nhỏ (Từ 2 đến 4 tuổi)
                      </td>
                      <td className={cn('font-normal text-red-color')}>
                        {convertNumToVND(product?.price?.children || 0)}
                      </td>
                    </tr>
                    <tr className={cn('text-sm text-primary-color')}>
                      <td colSpan={2} className={cn('font-normal')}>
                        Em bé (Dưới 2 tuổi)
                      </td>
                      <td className={cn('font-normal text-red-color')}>
                        {convertNumToVND(product?.price?.infant || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={cn('mt-6 ')}>
                <h2 className={cn('text-primary-color font-bold text-xl')}>
                  Giá tour & phụ thu phòng đơn
                </h2>
                <div className={cn('bg-[#f9f9f9] p-6 rounded-xl')}>
                  <div className={cn('grid grid-cols-2 text-sm mb-6 ')}>
                    <p className={cn('col-span-1')}>Ngày giờ tập trung</p>
                    <div className={cn('col-span-1')}>
                      <p>
                        {convertDateDDMMYYYYhhmm(
                          product?.tripInfo?.focusAt || ''
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={cn('grid grid-cols-2 text-sm')}>
                    <p className={cn('col-span-1')}>Nơi tập trung</p>
                    <div className={cn('col-span-1')}>
                      <p>{product?.tripInfo?.startingGate?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h4
          className={cn(
            'text-center text-2xl font-bold text-primary-color mb-4 mt-10'
          )}
        >
          Những thông tin cần lưu ý
        </h4>
        <div className={cn('grid grid-cols-2 w-[85%] m-auto gap-8')}>
          <div className={cn('flex flex-col gap-4')}>
            {[...new Array(5)].map((_, i) => (
              <NoteCollapsible key={NOTE_INFO[i].title} {...NOTE_INFO[i]} />
            ))}
          </div>
          <div className={cn('flex flex-col gap-4')}>
            {[...new Array(5)].map((_, i) => (
              <NoteCollapsible
                key={NOTE_INFO[i + 6].title}
                {...NOTE_INFO[i + 6]}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <h4
          className={cn(
            'text-center text-2xl font-bold text-primary-color mb-4 mt-10'
          )}
        >
          Có thể quý khách sẽ thích
        </h4>
        <div className={cn('grid grid-cols-4 gap-4 w-[85%] m-auto mt-8')}>
          {/* <CardVertical />
          <CardVertical />
          <CardVertical />
          <CardVertical /> */}
        </div>
      </section>
    </div>
  )
}
